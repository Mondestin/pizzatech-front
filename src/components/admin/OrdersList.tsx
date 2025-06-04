import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { Order } from "@/services/orderService";

interface OrdersListProps {
  orders: Order[];
  onStatusChange: (orderId: number, newStatus: string) => Promise<void>;
}

const OrdersList = ({ orders, onStatusChange }: OrdersListProps) => {
  const [updatingOrder, setUpdatingOrder] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ready":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "ready":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    setUpdatingOrder(orderId);
    try {
      await onStatusChange(orderId, newStatus);
    } finally {
      setUpdatingOrder(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Commandes Récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg border p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Commande #{order.id} • {formatDate(order.created_at)}
                  </p>
                  <Badge className={`flex items-center gap-1 mt-2 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </Badge>
                </div>
                <p className="font-bold text-lg text-gray-900">{order.total_price.toFixed(2)} €</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-gray-100">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.pizza_name}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity}x • {item.unit_price.toFixed(2)} €
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.subtotal.toFixed(2)} €
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-end space-x-2">
                  {order.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                        onClick={() => handleStatusChange(order.id, "ready")}
                        disabled={updatingOrder === order.id}
                      >
                        Marquer comme prête
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                        onClick={() => handleStatusChange(order.id, "cancelled")}
                        disabled={updatingOrder === order.id}
                      >
                        Annuler
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersList; 