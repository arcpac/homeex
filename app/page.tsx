import DebtChart from "@/components/DebtChart";
import ItemChart from "@/components/ItemChart";
import RecentItems from "@/components/RecentItems";
import prisma from "@/prisma/db";
import React from "react";

const Dashboard = async () => {
  const items = await prisma.item.findMany({
    orderBy: { createdAt: "desc" },
    skip: 0,
    take: 7,
    include: { owner: true },
  });

  const groupedItems = await prisma.item.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  const groupedOwnedItemsByUser = await prisma.user.findMany({
    include: {
      items: true,
    },
  });


  const ownedItemsByUser = groupedOwnedItemsByUser.map((item) => {
    return {
      name: item.name,
      email: item.email,
      itemCount: item.items.length,
    };
  });

  const data = groupedItems.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    };
  });

  return (
    <div>
      <div className="space-y-2">
        <div className="grid md:grid-cols-2 space-x-2">
          <div>
            <RecentItems items={items} />
          </div>
          <div>
            <ItemChart data={data} />
          </div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-start-1 col-end-7 ...">
            <DebtChart data={ownedItemsByUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
