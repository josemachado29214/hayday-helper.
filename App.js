import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, StatusBar } from 'react-native';

const tools = [
  { icon: '⭐', title: 'Calculadora XP', subtitle: 'Planeia o próximo nível', color: '#65b8e8' },
  { icon: '💰', title: 'Custos e lucros', subtitle: 'Descobre o que compensa', color: '#79c95b' },
  { icon: '🏭', title: 'Produção', subtitle: 'Máquinas e tempos', color: '#b28be8' },
  { icon: '🐮', title: 'Animais', subtitle: 'Rações e produtos', color: '#f2a64b' },
  { icon: '📦', title: 'Encomendas', subtitle: 'Organiza os pedidos', color: '#58c9c7' },
  { icon: '🌽', title: 'Plantações', subtitle: 'Culturas e colheitas', color: '#9acb48' },
];

const numeric = value => {
  const parsed = Number(String(value).replace(',', '.'));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
};

function Field({ label, value, onChangeText, placeholder }) {
  return <View style={styles.fieldWrap}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput keyboardType="decimal-pad" value={value} onChangeText={onChangeText}
      placeholder={placeholder || '0'} placeholderTextColor="#aa9b80" style={styles.input} />
  </View>;
}

function ToolCard({ item, onPress }) {
  return <TouchableOpacity accessibilityRole="button" onPress={onPress} style={[styles.toolCard, { backgroundColor: item.color }]}>
    <Text style={styles.toolIcon}>{item.icon}</Text>
    <Text style={styles.toolTitle}>{item.title}</Text>
    <Text style={styles.toolSubtitle}>{item.subtitle}</Text>
  </TouchableOpacity>;
}

function XpCalculator({ onBack }) {
  const [currentXp, setCurrentXp] = useState('2450');
  const [targetXp, setTargetXp] = useState('3000');
  const [xpPerItem, setXpPerItem] = useState('12');
  const remaining = Math.max(0, numeric(targetXp) - numeric(currentXp));
  const items = numeric(xpPerItem) > 0 ? Math.ceil(remaining / numeric(xpPerItem)) : null;
  const progress = numeric(targetXp) > 0 ? Math.min(1, numeric(currentXp) / numeric(targetXp)) : 0;
  return <View>
    <TouchableOpacity onPress={onBack} style={styles.back}><Text style={styles.backText}>‹  Voltar à quinta</Text></TouchableOpacity>
    <View style={styles.toolHeroBlue}>
      <Text style={styles.toolHeroIcon}>⭐</Text>
      <Text style={styles.toolHeroTitle}>Calculadora de XP</Text>
      <Text style={styles.toolHeroSub}>Descobre quanto falta para chegares ao teu objetivo.</Text>
    </View>
    <View style={styles.panel}>
      <Field label="XP que tens atualmente" value={currentXp} onChangeText={setCurrentXp} placeholder="Ex.: 2450" />
      <Field label="XP necessário para o objetivo" value={targetXp} onChangeText={setTargetXp} placeholder="Ex.: 3000" />
      <Field label="XP ganho por produto/ação" value={xpPerItem} onChangeText={setXpPerItem} placeholder="Introduz o valor indicado no jogo" />
      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>XP QUE AINDA FALTA</Text>
        <Text style={styles.resultNumber}>{remaining.toLocaleString('pt-PT')} XP</Text>
        <View style={styles.progress}><View style={[styles.progressFill,{width: (progress*100)+'%'}]} /></View>
        <Text style={styles.resultDetail}>{items === null ? 'Indica um XP por produto superior a zero.' : items === 0 ? 'Objetivo atingido! Parabéns! 🎉' : 'Precisarias de '+items.toLocaleString('pt-PT')+' ações/produtos neste valor de XP.'}</Text>
      </View>
      <Text style={styles.disclaimer}>Os valores são introduzidos por ti. A aplicação não assume valores oficiais de XP do Hay Day.</Text>
    </View>
  </View>;
}

function BarnInventory({ onBack }) {
  const [items, setItems] = useState([
    { id: 'wheat', name: 'Trigo', icon: '🌾', count: 20 },
    { id: 'corn', name: 'Milho', icon: '🌽', count: 12 },
    { id: 'milk', name: 'Leite', icon: '🥛', count: 8 },
    { id: 'eggs', name: 'Ovos', icon: '🥚', count: 15 },
  ]);
  const total = items.reduce((sum, item) => sum + item.count, 0);
  const change = (id, amount) => setItems(current => current.map(item =>
    item.id === id ? { ...item, count: Math.max(0, item.count + amount) } : item
  ));
  return <View>
    <TouchableOpacity onPress={onBack} style={styles.back}><Text style={styles.backText}>‹  Voltar à quinta</Text></TouchableOpacity>
    <View style={styles.toolHeroGreen}>
      <Text style={styles.toolHeroIcon}>📦</Text>
      <Text style={styles.toolHeroTitle}>O meu celeiro</Text>
      <Text style={styles.toolHeroSub}>Regista as quantidades dos teus produtos. Estes dados ficam, por agora, apenas nesta sessão.</Text>
    </View>
    <View style={styles.panel}>
      <Text style={styles.sectionHeading}>Produtos guardados</Text>
      {items.map(item => <View key={item.id} style={styles.inventoryRow}>
        <View style={styles.inventoryName}><Text style={styles.inventoryIcon}>{item.icon}</Text><Text style={styles.inventoryLabel}>{item.name}</Text></View>
        <View style={styles.counterRow}>
          <TouchableOpacity accessibilityLabel={'Retirar '+item.name} style={styles.counter} onPress={() => change(item.id,-1)}><Text style={styles.counterText}>−</Text></TouchableOpacity>
          <Text style={styles.inventoryCount}>{item.count}</Text>
          <TouchableOpacity accessibilityLabel={'Adicionar '+item.name} style={styles.counter} onPress={() => change(item.id,1)}><Text style={styles.counterText}>+</Text></TouchableOpacity>
        </View>
      </View>)}
      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>TOTAL DE UNIDADES REGISTADAS</Text>
        <Text style={styles.resultNumber}>{total}</Text>
      </View>
      <Text style={styles.disclaimer}>Lista de demonstração. Ainda não está ligada à conta nem ao inventário real do Hay Day.</Text>
    </View>
  </View>;
}

function ProfitCalculator({ onBack }) {
  const [cost, setCost] = useState('20');
  const [sale, setSale] = useState('35');
  const [quantity, setQuantity] = useState('1');
  const profit = (numeric(sale)-numeric(cost))*numeric(quantity);
  const margin = numeric(sale)>0 ? ((numeric(sale)-numeric(cost))/numeric(sale))*100 : 0;
  return <View>
    <TouchableOpacity onPress={onBack} style={styles.back}><Text style={styles.backText}>‹  Voltar à quinta</Text></TouchableOpacity>
    <View style={styles.toolHeroGreen}>
      <Text style={styles.toolHeroIcon}>💰</Text>
      <Text style={styles.toolHeroTitle}>Custos e lucros</Text>
      <Text style={styles.toolHeroSub}>Compara o custo e o preço de venda dos teus produtos.</Text>
    </View>
    <View style={styles.panel}>
      <Field label="Custo total por unidade" value={cost} onChangeText={setCost} placeholder="0" />
      <Field label="Preço de venda por unidade" value={sale} onChangeText={setSale} placeholder="0" />
      <Field label="Quantidade" value={quantity} onChangeText={setQuantity} placeholder="1" />
      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>LUCRO / PREJUÍZO ESTIMADO</Text>
        <Text style={[styles.resultNumber,{color:profit>=0?'#4d913b':'#bd5147'}]}>{profit.toLocaleString('pt-PT',{maximumFractionDigits:2})}</Text>
        <Text style={styles.resultDetail}>Margem sobre a venda: {margin.toLocaleString('pt-PT',{maximumFractionDigits:1})}%</Text>
      </View>
      <Text style={styles.disclaimer}>Introduz os teus próprios custos e preços. Não são preços oficiais nem recomendações de mercado.</Text>
    </View>
  </View>;
}

export default function App() {
  const [screen, setScreen] = useState('Início');
  const [barnSpace, setBarnSpace] = useState(125);
  const goHome = () => setScreen('Início');

  return <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="dark-content" backgroundColor="#b9e98c" />
    <ScrollView contentContainerStyle={styles.page}>
      {screen === 'Calculadora XP' ? <XpCalculator onBack={goHome} /> :
       screen === 'Custos e lucros' ? <ProfitCalculator onBack={goHome} /> :\n       screen === 'O meu celeiro' ? <BarnInventory onBack={goHome} /> :
       <View>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>A TUA QUINTA, MAIS ORGANIZADA</Text>
          <Text style={styles.logo}>🌻 HayDay Helper</Text>
          <Text style={styles.welcome}>Olá, agricultor! Vamos fazer crescer a quinta?</Text>
          <View style={styles.levelRow}>
            <View><Text style={styles.smallLabel}>O TEU PROGRESSO</Text><Text style={styles.level}>O teu nível</Text></View>
            <View style={styles.xpPill}><Text style={styles.xpText}>⭐ Regista o teu XP</Text></View>
          </View>
          <Text style={styles.demoNote}>Configura os teus valores nas calculadoras.</Text>
        </View>
        <TouchableOpacity activeOpacity={0.85} onPress={() => setScreen('O meu celeiro')} style={styles.barnCard}>
          <View><Text style={styles.sectionTitle}>📦 O meu celeiro</Text><Text style={styles.barnSub}>Espaço utilizado (contador de exemplo)</Text></View>
          <View style={styles.barnRight}>
            <Text style={styles.barnCount}>{barnSpace} / 200</Text>
            <View style={styles.counterRow}>
              <TouchableOpacity accessibilityLabel="Diminuir espaço usado" style={styles.counter} onPress={() => setBarnSpace(v => Math.max(0,v-1))}><Text style={styles.counterText}>−</Text></TouchableOpacity>
              <TouchableOpacity accessibilityLabel="Aumentar espaço usado" style={styles.counter} onPress={() => setBarnSpace(v => Math.min(200,v+1))}><Text style={styles.counterText}>+</Text></TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.sectionHeading}>Ferramentas da quinta</Text>
        <View style={styles.grid}>{tools.map(item => <ToolCard key={item.title} item={item} onPress={() => setScreen(item.title)} />)}</View>
        <View style={styles.tip}><Text style={styles.tipTitle}>💡 Dica da quinta</Text><Text style={styles.tipText}>Introduz os valores que vês no jogo para obteres cálculos ajustados à tua quinta.</Text></View>
        <Text style={styles.footer}>HayDay Helper • Projeto independente feito por fãs</Text>
       </View>}
    </ScrollView>
    <View style={styles.nav}>
      {['Início','XP','Lucros','Ferramentas'].map(label => <TouchableOpacity key={label} onPress={() => setScreen(label==='XP'?'Calculadora XP':label==='Lucros'?'Custos e lucros':'Início')} style={styles.navItem}>
        <Text style={[styles.navText, ((label==='Início'&&screen==='Início')||(label==='XP'&&screen==='Calculadora XP')||(label==='Lucros'&&screen==='Custos e lucros'))&&styles.navActive]}>
          {label==='Início'?'🏡':label==='XP'?'⭐':label==='Lucros'?'💰':'🧰'}{'\n'}{label}
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
 smallLabel:{fontSize:10,fontWeight:'900',color:'#547b42'},level:{fontSize:21,fontWeight:'900',color:'#315b2b'},
 xpPill:{backgroundColor:'#fff5ce',padding:9,borderRadius:18},xpText:{fontWeight:'800',color:'#765b20',fontSize:11},
 demoNote:{color:'#547b42',fontSize:11,marginTop:12},progress:{height:10,backgroundColor:'#e5f5d7',borderRadius:10,marginTop:10,overflow:'hidden'},
 progressFill:{height:'100%',backgroundColor:'#e8a93f',borderRadius:10},
 barnCard:{backgroundColor:'#fff',borderRadius:20,padding:16,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderWidth:2,borderColor:'#e7d7ae',marginBottom:22},
 sectionTitle:{fontSize:18,fontWeight:'900',color:'#684b2e'},barnSub:{fontSize:12,color:'#9a8566',marginTop:4},barnRight:{alignItems:'flex-end'},
 barnCount:{fontSize:17,fontWeight:'900',color:'#5c8d3d'},counterRow:{flexDirection:'row',gap:8,marginTop:6},
 counter:{backgroundColor:'#e8f5d9',width:30,height:28,borderRadius:9,alignItems:'center',justifyContent:'center'},counterText:{fontSize:20,fontWeight:'900',color:'#477a32'},
 sectionHeading:{fontSize:20,fontWeight:'900',color:'#5b472f',marginBottom:12},grid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',gap:10},
 toolCard:{width:'48%',minHeight:130,borderRadius:20,padding:14,borderWidth:2,borderColor:'rgba(80,70,40,0.12)',justifyContent:'center'},
 toolIcon:{fontSize:27,marginBottom:8},toolTitle:{fontSize:15,fontWeight:'900',color:'#fff'},toolSubtitle:{fontSize:11,color:'#fff',marginTop:4,fontWeight:'700'},
 tip:{marginTop:20,backgroundColor:'#fff0bd',borderRadius:18,padding:16,borderWidth:2,borderColor:'#efd48a'},tipTitle:{fontWeight:'900',fontSize:15,color:'#76551f'},
 tipText:{fontSize:13,color:'#765f37',marginTop:6,lineHeight:19},footer:{textAlign:'center',fontSize:10,color:'#9b927c',marginTop:20},
 nav:{flexDirection:'row',backgroundColor:'#fff',borderTopWidth:1,borderColor:'#e6dec9',paddingVertical:9,justifyContent:'space-around'},
 navItem:{alignItems:'center',flex:1},navText:{textAlign:'center',fontSize:10,color:'#93876e',fontWeight:'700',lineHeight:16},navActive:{color:'#4d913b'},
 back:{paddingVertical:8,marginBottom:12},backText:{color:'#598d3c',fontWeight:'800',fontSize:15},
 toolHeroBlue:{backgroundColor:'#a9dcf5',borderRadius:22,padding:20,marginBottom:14},toolHeroGreen:{backgroundColor:'#b8e5a0',borderRadius:22,padding:20,marginBottom:14},
 toolHeroIcon:{fontSize:30},toolHeroTitle:{fontSize:23,fontWeight:'900',color:'#365b42',marginTop:6},toolHeroSub:{fontSize:13,color:'#48684d',marginTop:5,lineHeight:19},
 panel:{backgroundColor:'#fff',borderRadius:20,padding:16,borderWidth:2,borderColor:'#e8ddc7'},fieldWrap:{marginBottom:14},
 fieldLabel:{fontSize:13,fontWeight:'800',color:'#6e5939',marginBottom:6},input:{backgroundColor:'#fbf8ef',borderWidth:1,borderColor:'#e6d9bd',borderRadius:12,paddingHorizontal:13,paddingVertical:11,fontSize:16,color:'#4d432f'},
 resultBox:{backgroundColor:'#fff2c9',borderRadius:16,padding:16,marginTop:4},resultLabel:{fontSize:10,fontWeight:'900',letterSpacing:1,color:'#856a2b'},
 resultNumber:{fontSize:29,fontWeight:'900',color:'#4e8a3c',marginTop:5},resultDetail:{fontSize:13,color:'#705d38',marginTop:9,lineHeight:19},
 disclaimer:{fontSize:11,color:'#94866d',lineHeight:16,marginTop:12},\n inventoryRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#f0e8d8'},\n inventoryName:{flexDirection:'row',alignItems:'center',gap:10},inventoryIcon:{fontSize:23},inventoryLabel:{fontSize:15,fontWeight:'800',color:'#685238'},inventoryCount:{minWidth:28,textAlign:'center',fontSize:16,fontWeight:'900',color:'#4d7538'}
});
