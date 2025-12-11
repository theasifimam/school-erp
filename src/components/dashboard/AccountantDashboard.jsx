import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, AlertCircle, Receipt } from "lucide-react";

export default function AccountantDashboard() {
  const stats = [
    {
      title: "Monthly Revenue",
      value: "₹8,45,000",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Pending Fees",
      value: "₹2,34,000",
      icon: AlertCircle,
      color: "text-red-600",
    },
    {
      title: "Expenses",
      value: "₹3,21,000",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "Invoices Issued",
      value: "156",
      icon: Receipt,
      color: "text-purple-600",
    },
  ];

  const recentTransactions = [
    {
      type: "Fee Payment",
      student: "John Doe",
      amount: "₹25,000",
      date: "Dec 10",
    },
    {
      type: "Salary",
      staff: "Teaching Staff",
      amount: "₹4,50,000",
      date: "Dec 5",
    },
    {
      type: "Expense",
      detail: "Lab Equipment",
      amount: "₹45,000",
      date: "Dec 8",
    },
    {
      type: "Fee Payment",
      student: "Jane Smith",
      amount: "₹25,000",
      date: "Dec 9",
    },
  ];

  const pendingPayments = [
    {
      student: "Alex Brown",
      class: "Class 10-A",
      amount: "₹25,000",
      due: "Dec 15",
    },
    {
      student: "Emma Davis",
      class: "Class 9-B",
      amount: "₹25,000",
      due: "Dec 12",
    },
    {
      student: "Chris Lee",
      class: "Class 11-C",
      amount: "₹28,000",
      due: "Dec 18",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-2 border rounded"
                >
                  <div>
                    <div className="font-medium text-sm">
                      {transaction.type}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.student ||
                        transaction.staff ||
                        transaction.detail}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      {transaction.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingPayments.map((payment, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-2 border rounded border-orange-200 bg-orange-50"
                >
                  <div>
                    <div className="font-medium text-sm">{payment.student}</div>
                    <div className="text-sm text-muted-foreground">
                      {payment.class}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm text-orange-600">
                      {payment.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Due: {payment.due}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
