import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, StatusBar } from 'react-native';

const numeric = value => {
  const n = Number(String(value).replace(',', '.'));
  return Number.isFinite(n) && n >= 0 ? n : 0;
};
const fmt = n => n.toLocaleString('pt-PT', { maximumFractionDigits: 2 });

const tools = [
  { icon: '⭐', title: 'Calculadora XP', subtitle: 'Quanto falta para subir?', color: '#65b8e8' },
  { icon: '💰', title: 'Custos e lucros', subtitle: 'Vale a pena vender?', color: '#79c95b' },
  { icon: '🏭', title: 'Planeador produção', subtitle: 'Tempo e rendimento', color: '#b28be8' },
  { icon: '🐮', title: 'Animais', subtitle: 'Ciclos de alimentação', color: '#f2a64b' },
  { icon: '📦', title: 'Celeiro', subtitle: 'Controla os produtos', color: '#58c9c7' },
  { icon: '🌽', title: 'Plantações', subtitle: 'Planeia as colheitas', color: '#9acb48' },
];

function Field({ label, value, onChangeText, placeholder = '0' }) {
  return <View style={styles.fieldWrap}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput keyboardType="decimal-pad" value={value} onChangeText={onChangeText}
      placeholder={placeholder} placeholderTextColor="#aa9b80" style={styles.input} />
  </View>;
}
function Back({ onPress }) {
  return <TouchableOpacity onPress={onPress} style={styles.back}><Text style={styles.backText}>‹  Voltar à quinta</Text></TouchableOpacity>;
}
function Hero({ icon, title, subtitle, color = '#b8e5a0' }) {
  return <View style={[styles.toolHero, { backgroundColor: color }]}>
    <Text style={styles.toolHeroIcon}>{icon}</Text><Text style={styles.toolHeroTitle}>{title}</Text>
    <Text style={styles.toolHeroSub}>{subtitle}</Text>
  </View>;
}
function Result({ label, value, detail, negative = false }) {
  return <View style={styles.resultBox}><Text style={styles.resultLabel}>{label}</Text>
    <Text style={[styles.resultNumber, negative && { color: '#bd5147' }]}>{value}</Text>
    {!!detail && <Text style={styles.resultDetail}>{detail}</Text>}
  </View>;
}
function Disclaimer({ children }) {
  return <Text style={styles.disclaimer}>{children}</Text>;
}

function XpCalculator({ onBack }) {
  const [current, setCurrent] = useState('');
  const [target, setTarget] = useState('');
  const [perAction, setPerAction] = useState('');
  const remaining = Math.max(0, numeric(target) - numeric(current));
  const actions = numeric(perAction) > 0 ? Math.ceil(remaining / numeric(perAction)) : null;
  const progress = numeric(target) > 0 ? Math.min(100, numeric(current) / numeric(target) * 100) : 0;
  return <View><Back onPress={onBack} /><Hero icon="⭐" title="Calculadora de XP" subtitle="Define o objetivo e calcula quantas ações faltam." color="#a9dcf5" />
    <View style={styles.panel}>
      <Field label="XP atual" value={current} onChangeText={setCurrent} placeholder="Ex.: 2450" />
      <Field label="XP do próximo nível / objetivo" value={target} onChangeText={setTarget} placeholder="Ex.: 3000" />
      <Field label="XP ganho por ação ou produto" value={perAction} onChangeText={setPerAction} placeholder="Introduz o valor do jogo" />
      <Result label="XP QUE FALTA" value={fmt(remaining) + ' XP'} detail={actions === null ? 'Indica o XP por ação para estimar a quantidade.' : actions === 0 ? 'Objetivo atingido! 🎉' : 'Cerca de ' + fmt(actions) + ' ações neste valor de XP.'} />
      <View style={styles.progress}><View style={[styles.progressFill, { width: progress + '%' }]} /></View>
      <Disclaimer>Os campos começam vazios para não apresentar valores inventados. Introduz os dados que vês no jogo.</Disclaimer>
    </View>
  </View>;
}

function ProfitCalculator({ onBack }) {
  const [cost, setCost] = useState('');
  const [sale, setSale] = useState('');
  const [quantity, setQuantity] = useState('1');
  const profit = (numeric(sale) - numeric(cost)) * numeric(quantity);
  const margin = numeric(sale) > 0 ? (numeric(sale) - numeric(cost)) / numeric(sale) * 100 : 0;
  return <View><Back onPress={onBack} /><Hero icon="💰" title="Custos e lucros" subtitle="Compara o custo de produção com o preço de venda." />
    <View style={styles.panel}>
      <Field label="Custo por unidade" value={cost} onChangeText={setCost} />
      <Field label="Preço de venda por unidade" value={sale} onChangeText={setSale} />
      <Field label="Quantidade" value={quantity} onChangeText={setQuantity} />
      <Result label="LUCRO / PREJUÍZO TOTAL" value={fmt(profit)} detail={'Margem sobre a venda: ' + fmt(margin) + '%'} negative={profit < 0} />
      <Disclaimer>Introduz os teus próprios custos e preços. O cálculo não inclui taxas ou outros custos que não preenchas.</Disclaimer>
    </View>
  </View>;
}

function ProductionPlanner({ onBack }) {
  const [batch, setBatch] = useState('1');
  const [minutes, setMinutes] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [quantity, setQuantity] = useState('1');
  const totalMinutes = numeric(minutes) * numeric(batch);
  const profit = (numeric(price) - numeric(cost)) * numeric(quantity) * numeric(batch);
  return <View><Back onPress={onBack} /><Hero icon="🏭" title="Planeador de produção" subtitle="Calcula duração e resultado estimado dos teus ciclos." color="#d9c4f5" />
    <View style={styles.panel}>
      <Field label="Número de ciclos / lotes" value={batch} onChangeText={setBatch} />
      <Field label="Duração de um ciclo (minutos)" value={minutes} onChangeText={setMinutes} placeholder="Tempo indicado no jogo" />
      <Field label="Unidades produzidas por ciclo" value={quantity} onChangeText={setQuantity} />
      <Field label="Preço de venda por unidade" value={price} onChangeText={setPrice} />
      <Field label="Custo por unidade" value={cost} onChangeText={setCost} />
      <Result label="TEMPO TOTAL" value={fmt(totalMinutes) + ' min'} detail={'Equivale a ' + fmt(totalMinutes / 60) + ' horas.'} />
      <Result label="LUCRO ESTIMADO DOS LOTES" value={fmt(profit)} negative={profit < 0} />
      <Disclaimer>Usa os tempos, custos e preços apresentados no teu jogo. Não há dados oficiais pré-carregados nesta calculadora.</Disclaimer>
    </View>
  </View>;
}

function CropPlanner({ onBack }) {
  const [plots, setPlots] = useState('10');
  const [yieldPerPlot, setYieldPerPlot] = useState('1');
  const [growMinutes, setGrowMinutes] = useState('');
  const total = numeric(plots) * numeric(yieldPerPlot);
  return <View><Back onPress={onBack} /><Hero icon="🌽" title="Planeador de plantações" subtitle="Prepara a próxima colheita." color="#d5ed9d" />
    <View style={styles.panel}>
      <Field label="Número de parcelas" value={plots} onChangeText={setPlots} />
      <Field label="Unidades por parcela" value={yieldPerPlot} onChangeText={setYieldPerPlot} />
      <Field label="Tempo de crescimento (minutos)" value={growMinutes} onChangeText={setGrowMinutes} placeholder="Tempo indicado no jogo" />
      <Result label="COLHEITA ESTIMADA" value={fmt(total) + ' unidades'} detail={numeric(growMinutes) > 0 ? 'Tempo até à colheita: ' + fmt(numeric(growMinutes)) + ' minutos.' : 'Introduz o tempo da cultura para completar o plano.'} />
      <Disclaimer>O rendimento por parcela e o tempo são editáveis. Confirma sempre os valores no jogo.</Disclaimer>
    </View>
  </View>;
}

function AnimalPlanner({ onBack }) {
  const [animals, setAnimals] = useState('5');
  const [feedPerAnimal, setFeedPerAnimal] = useState('1');
  const [minutes, setMinutes] = useState('');
  const feed = numeric(animals) * numeric(feedPerAnimal);
  return <View><Back onPress={onBack} /><Hero icon="🐮" title="Planeador de animais" subtitle="Calcula a quantidade de ração para o teu grupo." color="#ffd39a" />
    <View style={styles.panel}>
      <Field label="Número de animais" value={animals} onChangeText={setAnimals} />
      <Field label="Rações por animal neste ciclo" value={feedPerAnimal} onChangeText={setFeedPerAnimal} />
      <Field label="Duração do ciclo (minutos)" value={minutes} onChangeText={setMinutes} placeholder="Tempo indicado no jogo" />
      <Result label="RAÇÕES NECESSÁRIAS" value={fmt(feed)} detail={numeric(minutes) > 0 ? 'Duração indicada: ' + fmt(minutes) + ' minutos.' : 'Introduz a duração do ciclo, se quiseres planear o horário.'} />
      <Disclaimer>Calculadora genérica. Os consumos e tempos devem ser confirmados para cada animal no jogo.</Disclaimer>
    </View>
  </View>;
}

function BarnInventory({ onBack }) {
  const [items, setItems] = useState([
    { id: 'wheat', name: 'Trigo', icon: '🌾', count: 0 },
    { id: 'corn', name: 'Milho', icon: '🌽', count: 0 },
    { id: 'milk', name: 'Leite', icon: '🥛', count: 0 },
    { id: 'eggs', name: 'Ovos', icon: '🥚', count: 0 },
  ]);
  const total = items.reduce((sum, item) => sum + item.count, 0);
  const change = (id, amount) => setItems(current => current.map(item => item.id === id ? { ...item, count: Math.max(0, item.count + amount) } : item));
  return <View><Back onPress={onBack} /><Hero icon="📦" title="O meu celeiro" subtitle="Regista manualmente as quantidades dos teus produtos." color="#a8e1d8" />
    <View style={styles.panel}><Text style={styles.sectionHeading}>Produtos guardados</Text>
      {items.map(item => <View key={item.id} style={styles.inventoryRow}>
        <View style={styles.inventoryName}><Text style={styles.inventoryIcon}>{item.icon}</Text><Text style={styles.inventoryLabel}>{item.name}</Text></View>
        <View style={styles.counterRow}>
          <TouchableOpacity style={styles.counter} onPress={() => change(item.id, -1)}><Text style={styles.counterText}>−</Text></TouchableOpacity>
          <Text style={styles.inventoryCount}>{item.count}</Text>
          <TouchableOpacity style={styles.counter} onPress={() => change(item.id, 1)}><Text style={styles.counterText}>+</Text></TouchableOpacity>
        </View>
      </View>)}
      <Result label="TOTAL DE UNIDADES REGISTADAS" value={fmt(total)} />
      <Disclaimer>Registo manual de demonstração. Ainda não sincroniza entre dispositivos nem lê automaticamente o inventário do Hay Day.</Disclaimer>
    </View>
  </View>;
}

export default function App() {
  const [screen, setScreen] = useState('Início');
  const goHome = () => setScreen('Início');
  const screens = {
    'Calculadora XP': <XpCalculator onBack={goHome} />,
    'Custos e lucros': <ProfitCalculator onBack={goHome} />,
    'Planeador produção': <ProductionPlanner onBack={goHome} />,
    'Plantações': <CropPlanner onBack={goHome} />,
    'Animais': <AnimalPlanner onBack={goHome} />,
    'Celeiro': <BarnInventory onBack={goHome} />,
  };
  return <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="dark-content" backgroundColor="#b9e98c" />
    <ScrollView contentContainerStyle={styles.page}>
      {screens[screen] || <View>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>A TUA QUINTA, MAIS ORGANIZADA</Text>
          <Text style={styles.logo}>🌻 HayDay Helper</Text>
          <Text style={styles.welcome}>Olá, agricultor! Vamos fazer crescer a quinta?</Text>
          <View style={styles.levelRow}><Text style={styles.level}>A tua quinta</Text><View style={styles.xpPill}><Text style={styles.xpText}>🚜 Vamos começar!</Text></View></View>
          <Text style={styles.demoNote}>Ferramentas para planeares a tua quinta com os teus próprios dados.</Text>
        </View>
        <TouchableOpacity activeOpacity={0.85} onPress={() => setScreen('Celeiro')} style={styles.barnCard}>
          <View><Text style={styles.sectionTitle}>📦 O meu celeiro</Text><Text style={styles.barnSub}>Abre para registar os teus produtos</Text></View><Text style={styles.barnArrow}>›</Text>
        </TouchableOpacity>
        <Text style={styles.sectionHeading}>Ferramentas da quinta</Text>
        <View style={styles.grid}>{tools.map(item => <TouchableOpacity key={item.title} onPress={() => setScreen(item.title)} style={[styles.toolCard,{backgroundColor:item.color}]}>
          <Text style={styles.toolIcon}>{item.icon}</Text><Text style={styles.toolTitle}>{item.title}</Text><Text style={styles.toolSubtitle}>{item.subtitle}</Text>
        </TouchableOpacity>)}</View>
        <View style={styles.tip}><Text style={styles.tipTitle}>💡 Dica da quinta</Text><Text style={styles.tipText}>Introduz os valores que vês no jogo para obteres cálculos ajustados à tua quinta.</Text></View>
        <Text style={styles.footer}>HayDay Helper • Projeto independente feito por fãs</Text>
      </View>}
    </ScrollView>
    <View style={styles.nav}>
      {['Início','XP','Lucros','Produção'].map(label => <TouchableOpacity key={label} onPress={() => setScreen(label==='XP'?'Calculadora XP':label==='Lucros'?'Custos e lucros':label==='Produção'?'Planeador produção':'Início')} style={styles.navItem}>
        <Text style={[styles.navText, ((label==='Início'&&screen==='Início')||(label==='XP'&&screen==='Calculadora XP')||(label==='Lucros'&&screen==='Custos e lucros')||(label==='Produção'&&screen==='Planeador produção'))&&styles.navActive]}>
          {label==='Início'?'🏡':label==='XP'?'⭐':label==='Lucros'?'💰':'🏭'}{'\\n'}{label}
        </Text>
      </TouchableOpacity>)}
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
 safe:{flex:1,backgroundColor:'#f7f2df'},page:{padding:16,paddingBottom:24},
 hero:{backgroundColor:'#b9e98c',borderRadius:26,padding:20,borderWidth:3,borderColor:'#83c65b',marginBottom:16},
 eyebrow:{fontSize:10,fontWeight:'900',letterSpacing:1.4,color:'#416b32'},logo:{fontSize:27,fontWeight:'900',color:'#315b2b',marginTop:8},
 welcome:{fontSize:14,color:'#42653a',marginTop:7,fontWeight:'600'},levelRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:22},
 level:{fontSize:21,fontWeight:'900',color:'#315b2b'},xpPill:{backgroundColor:'#fff5ce',padding:9,borderRadius:18},xpText:{fontWeight:'800',color:'#765b20',fontSize:11},
 demoNote:{color:'#547b42',fontSize:11,marginTop:12},barnCard:{backgroundColor:'#fff',borderRadius:20,padding:16,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderWidth:2,borderColor:'#e7d7ae',marginBottom:22},
 sectionTitle:{fontSize:18,fontWeight:'900',color:'#684b2e'},barnSub:{fontSize:12,color:'#9a8566',marginTop:4},barnArrow:{fontSize:28,color:'#5c8d3d'},
 sectionHeading:{fontSize:20,fontWeight:'900',color:'#5b472f',marginBottom:12},grid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',gap:10},
 toolCard:{width:'48%',minHeight:130,borderRadius:20,padding:14,borderWidth:2,borderColor:'rgba(80,70,40,0.12)',justifyContent:'center'},
 toolIcon:{fontSize:27,marginBottom:8},toolTitle:{fontSize:15,fontWeight:'900',color:'#fff'},toolSubtitle:{fontSize:11,color:'#fff',marginTop:4,fontWeight:'700'},
 tip:{marginTop:20,backgroundColor:'#fff0bd',borderRadius:18,padding:16,borderWidth:2,borderColor:'#efd48a'},tipTitle:{fontWeight:'900',fontSize:15,color:'#76551f'},
 tipText:{fontSize:13,color:'#765f37',marginTop:6,lineHeight:19},footer:{textAlign:'center',fontSize:10,color:'#9b927c',marginTop:20},
 nav:{flexDirection:'row',backgroundColor:'#fff',borderTopWidth:1,borderColor:'#e6dec9',paddingVertical:9,justifyContent:'space-around'},navItem:{alignItems:'center',flex:1},
 navText:{textAlign:'center',fontSize:10,color:'#93876e',fontWeight:'700',lineHeight:16},navActive:{color:'#4d913b'},
 back:{paddingVertical:8,marginBottom:12},backText:{color:'#598d3c',fontWeight:'800',fontSize:15},
 toolHero:{borderRadius:22,padding:20,marginBottom:14},toolHeroIcon:{fontSize:30},toolHeroTitle:{fontSize:23,fontWeight:'900',color:'#365b42',marginTop:6},
 toolHeroSub:{fontSize:13,color:'#48684d',marginTop:5,lineHeight:19},panel:{backgroundColor:'#fff',borderRadius:20,padding:16,borderWidth:2,borderColor:'#e8ddc7'},
 fieldWrap:{marginBottom:14},fieldLabel:{fontSize:13,fontWeight:'800',color:'#6e5939',marginBottom:6},
 input:{backgroundColor:'#fbf8ef',borderWidth:1,borderColor:'#e6d9bd',borderRadius:12,paddingHorizontal:13,paddingVertical:11,fontSize:16,color:'#4d432f'},
 resultBox:{backgroundColor:'#fff2c9',borderRadius:16,padding:16,marginTop:8},resultLabel:{fontSize:10,fontWeight:'900',letterSpacing:1,color:'#856a2b'},
 resultNumber:{fontSize:29,fontWeight:'900',color:'#4e8a3c',marginTop:5},resultDetail:{fontSize:13,color:'#705d38',marginTop:9,lineHeight:19},
 progress:{height:10,backgroundColor:'#e5f5d7',borderRadius:10,marginTop:12,overflow:'hidden'},progressFill:{height:'100%',backgroundColor:'#e8a93f',borderRadius:10},
 disclaimer:{fontSize:11,color:'#94866d',lineHeight:16,marginTop:12},
 inventoryRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#f0e8d8'},
 inventoryName:{flexDirection:'row',alignItems:'center',gap:10},inventoryIcon:{fontSize:23},inventoryLabel:{fontSize:15,fontWeight:'800',color:'#685238'},
 inventoryCount:{minWidth:28,textAlign:'center',fontSize:16,fontWeight:'900',color:'#4d7538'},counterRow:{flexDirection:'row',alignItems:'center',gap:8},
 counter:{backgroundColor:'#e8f5d9',width:30,height:28,borderRadius:9,alignItems:'center',justifyContent:'center'},counterText:{fontSize:20,fontWeight:'900',color:'#477a32'}
});
