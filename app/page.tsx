import DebtChart from "@/components/DebtChart";
import ItemChart from "@/components/ItemChart";
import RecentItems from "@/components/RecentItems";
import TotalDebt from "@/components/TotalDebt";
import TotalItem from "@/components/TotalItem";
import prisma from "@/prisma/db";
import React from "react";

interface dataElements {
  ItemId: number;
  NumberOfUsers: number;
  title: string;
  price: number;
  PricePerUser: number;
  UserName: string;
}

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
      items: {
        select: {
          price: true,
        },
      },
    },
  });

  const computedPriceOfItemByUser = await prisma.$queryRaw<dataElements[]>`
  SELECT 
  ItemId,
  NumberOfUsers,
  title,
  price,
  PricePerUser,
  User.name as UserName
FROM (
  SELECT 
      _ItemToTag.A as ItemId,
      COUNT(_ItemToTag.A) as NumberOfUsers,
      Item.title,
      Item.price,
      Item.price / COUNT(_ItemToTag.B) as PricePerUser
  FROM 
      homexDB._ItemToTag
  JOIN 
      Item ON homexDB._ItemToTag.A = Item.id
  JOIN 
      User ON homexDB._ItemToTag.B = User.id
  GROUP BY 
      _ItemToTag.A, Item.title, Item.price
) AS PricePerUserTable
JOIN 
  homexDB._ItemToTag ON PricePerUserTable.ItemId = homexDB._ItemToTag.A
JOIN 
  User ON homexDB._ItemToTag.B = User.id;
`;


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
        <TotalItem data={ownedItemsByUser} />
        <TotalDebt data={computedPriceOfItemByUser} />
        <div className="grid md:grid-cols-2 space-x-2">
          <div>
            <RecentItems items={items} />
          </div>
          <div>
            <ItemChart data={data} />
          </div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-start-1 col-end-7">
            <DebtChart data={ownedItemsByUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
