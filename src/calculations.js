export function calculateXp({ currentXp, targetXp, xpPerAction }) {
  const current = Math.max(0, Number(currentXp) || 0);
  const target = Math.max(0, Number(targetXp) || 0);
  const perAction = Math.max(0, Number(xpPerAction) || 0);
  const remainingXp = Math.max(0, target - current);
  return {
    remainingXp,
    actionsNeeded: perAction > 0 ? Math.ceil(remainingXp / perAction) : null,
    progressPercent: target > 0 ? Math.min(100, (current / target) * 100) : 0,
  };
}

export function calculateProfit({ unitCost, unitSalePrice, quantity }) {
  const cost = Number(unitCost) || 0;
  const price = Number(unitSalePrice) || 0;
  const count = Math.max(0, Number(quantity) || 0);
  const totalRevenue = price * count;
  const totalCost = cost * count;
  const profit = totalRevenue - totalCost;
  return {
    totalRevenue,
    totalCost,
    profit,
    marginPercent: totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0,
  };
}

export function calculateProduction({ cycleMinutes, cycles, unitsPerCycle }) {
  const minutes = Math.max(0, Number(cycleMinutes) || 0);
  const count = Math.max(0, Number(cycles) || 0);
  const units = Math.max(0, Number(unitsPerCycle) || 0);
  return { totalMinutes: minutes * count, totalUnits: units * count };
}

export function calculateHarvest({ plots, unitsPerPlot }) {
  return Math.max(0, Number(plots) || 0) * Math.max(0, Number(unitsPerPlot) || 0);
}

export function calculateFeed({ animals, feedPerAnimal }) {
  return Math.max(0, Number(animals) || 0) * Math.max(0, Number(feedPerAnimal) || 0);
}
