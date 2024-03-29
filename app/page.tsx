import ItemChart from "@/components/ItemChart";
import RecentItems from "@/components/RecentItems";
import prisma from "@/prisma/db";
import React from "react";

const Dashboard = async () => {
  const items = await prisma.item.findMany({
    orderBy: { createdAt: "desc" },
    skip: 0,
    take: 5,
    include: { owner: true },
  });

  const groupedItems = await prisma.item.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  const data = groupedItems.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    };
  });

  return (
    <div>
      <div>
        <div className="grid gap-4 md:grid-cols-2 px-2">
          <div>
            <RecentItems items={items} />
          </div>
          <div>
            <ItemChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
