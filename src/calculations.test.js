import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateXp, calculateProfit, calculateProduction, calculateHarvest, calculateFeed } from './calculations.js';

test('XP: calcula ações necessárias arredondando para cima', () => {
  assert.deepEqual(calculateXp({ currentXp: 100, targetXp: 151, xpPerAction: 20 }), {
    remainingXp: 51, actionsNeeded: 3, progressPercent: (100 / 151) * 100
  });
});

test('XP: objetivo alcançado não devolve XP negativo', () => {
  assert.equal(calculateXp({ currentXp: 200, targetXp: 150, xpPerAction: 10 }).remainingXp, 0);
});

test('lucro: calcula receita, custo, lucro e margem', () => {
  assert.deepEqual(calculateProfit({ unitCost: 4, unitSalePrice: 7, quantity: 5 }), {
    totalRevenue: 35, totalCost: 20, profit: 15, marginPercent: (15 / 35) * 100
  });
});

test('produção: calcula duração e unidades de vários ciclos', () => {
  assert.deepEqual(calculateProduction({ cycleMinutes: 30, cycles: 4, unitsPerCycle: 2 }), {
    totalMinutes: 120, totalUnits: 8
  });
});

test('colheita e ração: calculam totais', () => {
  assert.equal(calculateHarvest({ plots: 12, unitsPerPlot: 3 }), 36);
  assert.equal(calculateFeed({ animals: 6, feedPerAnimal: 2 }), 12);
});
