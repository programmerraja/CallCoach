import { Button } from "../ui/button";
import { Menu, User, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { AnalysisResults } from "../../services/api";
import { fetchCallMetrics, deleteCallMetric } from "../../services/api";
import { toast } from "../ui/toast";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export interface CallMetric {
  _id: string;
  userId: string;
  summary: string;
  analysis: Partial<AnalysisResults>;
  audioUrl: string;
  createdAt: string;
  __v: number;
}

function SentimentIcon({ sentiment }: { sentiment: string }) {
  const getColor = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case "positive":
        return "text-green-500";
      case "negative":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  return (
    <span className={`text-lg ${getColor(sentiment)}`} title={sentiment}>
      {sentiment?.toLowerCase() === "positive"
        ? "😊"
        : sentiment?.toLowerCase() === "negative"
        ? "😟"
        : "😐"}
    </span>
  );
}

export function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [callMetrics, setCallMetrics] = useState<CallMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCallMetrics()
      .then((metrics) => {
        if (metrics) {
          setCallMetrics(metrics);
        } else {
          toast({
            title: "Error",
            description: "No metrics data received",
            variant: "destructive",
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        toast({
          title: "Error fetching call metrics",
          description: error.message,
          variant: "destructive",
        });
        console.error("Error fetching call metrics:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent card click when clicking delete
    
    try {
      await deleteCallMetric(id);
      setCallMetrics(callMetrics.filter(metric => metric._id !== id));
      toast({
        title: "Success",
        description: "Call recording deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete call recording",
        variant: "destructive",
      });
    }
  };

  const renderMetricCard = (metric: CallMetric) => {
    const talkRatioData = [
      {
        name: "Sales Rep",
        value: metric.analysis.talk_to_listen_ratio?.sales_rep || 0,
      },
      {
        name: "Customer",
        value: 100 - (metric.analysis.talk_to_listen_ratio?.sales_rep || 0),
      },
    ];

    const COLORS = ["#0088FE", "#00C49F"];

    return (
      <Card
        key={metric._id}
        className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer relative"
        onClick={() => navigate(`/dashboard/analysis/${metric._id}`)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {new Date(metric.createdAt).toLocaleDateString()}
            </div>
            <SentimentIcon
              sentiment={
                metric.analysis.sentiment?.overall_sentiment || "neutral"
              }
            />
          </div>

          {/* <p className="font-medium text-gray-800 line-clamp-2">{metric.summary}</p> */}

          <div className="h-[200px] w-full mb-4">
            <h1 className="text-lg font-semibold mb-2">Talk to Listen Ratio</h1>
            {/* <p className="text-sm text-gray-500 mb-2">This chart shows the ratio of talk time to listen time for both the sales rep and the customer.</p> */}
            <div className="flex justify-center ">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 bg-[#0088FE] mr-2"></div>
                <span className="text-sm text-gray-600">Sales Rep</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#00C49F] mr-2"></div>
                <span className="text-sm text-gray-600">Customer</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={talkRatioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {talkRatioData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">Key Metrics:</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div
                className="bg-gray-50 p-3 rounded-lg flex flex-col items-center"
                title="Number of objections raised by the customer"
              >
                <div className="text-sm text-gray-600">Objections</div>
                <div className="text-xl font-bold">
                  {metric.analysis.objection_count ?? "N/A"}
                </div>
              </div>
              <div
                className="bg-gray-50 p-3 rounded-lg flex flex-col items-center"
                title="Total number of questions asked by both sales rep and customer"
              >
                <div className="text-sm text-gray-600">Questions</div>
                <div className="text-xl font-bold">
                  {(metric.analysis.questions_asked?.sales_rep?.length || 0) +
                    (metric.analysis.questions_asked?.customer?.length || 0)}
                </div>
              </div>
            </div>
          </div>

          <div className="text-blue-600 text-sm mt-2 text-center">
            View detailed analysis →
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500"
          onClick={(e) => handleDelete(e, metric._id)}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </Card>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full overflow-x-hidden bg-gray-100">
      <header className="md:hidden flex items-center justify-between p-4 border-b w-full bg-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <User className="h-5 w-5" />
          </div>
          <h2 className="font-semibold">Sales Analytics AI</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Recent Call Analysis</h1>

          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : callMetrics.length === 0 ? (
            <div className="text-center text-gray-500">
              No call recordings found
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {callMetrics.map(renderMetricCard)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
