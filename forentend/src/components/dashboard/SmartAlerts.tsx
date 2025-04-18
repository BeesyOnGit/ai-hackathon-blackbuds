
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, ArrowUpRight, CircleDollarSign, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Alert {
  id: string;
  title: string;
  description: string;
  date: string;
  urgency: "low" | "medium" | "high";
  icon: React.ReactNode;
}

export function SmartAlerts() {
  const alerts: Alert[] = [
    {
      id: "1",
      title: "Unusual Spending Detected",
      description: "Your entertainment spending is 85% higher than your monthly average.",
      date: "2025-04-15",
      urgency: "medium",
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    },
    {
      id: "2",
      title: "Bill Due Soon",
      description: "Your electricity bill of $135 is due in 3 days.",
      date: "2025-04-17",
      urgency: "high",
      icon: <CircleDollarSign className="h-4 w-4 text-red-500" />,
    },
    {
      id: "3",
      title: "Investment Opportunity",
      description: "Based on your risk profile, consider reviewing this ETF opportunity.",
      date: "2025-04-14",
      urgency: "low",
      icon: <ArrowUpRight className="h-4 w-4 text-green-500" />,
    },
    {
      id: "4",
      title: "Security Alert",
      description: "We've detected a login from a new device. Please verify this was you.",
      date: "2025-04-16",
      urgency: "high",
      icon: <Shield className="h-4 w-4 text-red-500" />,
    },
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "low":
        return "bg-blue-100 text-blue-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Smart Alerts</CardTitle>
        <CardDescription>Intelligent notifications about your finances</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-3 border rounded-md bg-card/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {alert.icon}
                <h3 className="font-medium text-sm">{alert.title}</h3>
              </div>
              <Badge className={getUrgencyColor(alert.urgency)} variant="outline">
                {alert.urgency}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{alert.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">
                {new Date(alert.date).toLocaleDateString()}
              </span>
              <button className="text-xs text-primary hover:underline">
                View details
              </button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
