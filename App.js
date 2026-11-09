import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const tools = [
  { icon: '⭐', title: 'Calculadora XP', subtitle: 'Planeia o próximo nível', color: '#65b8e8' },
  { icon: '💰', title: 'Custos e lucros', subtitle: 'Descobre o que compensa', color: '#79c95b' },
  { icon: '🏭', title: 'Produção', subtitle: 'Máquinas e tempos', color: '#b28be8' },
  { icon: '🐮', title: 'Animais', subtitle: 'Rações e produtos', color: '#f2a64b' },
  { icon: '📦', title: 'Encomendas', subtitle: 'Organiza os pedidos', color: '#58c9c7' },
  { icon: '🌽', title: 'Plantações', subtitle: 'Culturas e colheitas', color: '#9acb48' },
];

function ToolCard({ item, onPress }) {
  return <TouchableOpacity accessibilityRole="button" onPress={onPress} style={[styles.toolCard, { backgroundColor: item.color }]}>
    <Text style={styles.toolIcon}>{item.icon}</Text>
    <Text style={styles.toolTitle}>{item.title}</Text>
    <Text style={styles.toolSubtitle}>{item.subtitle}</Text>
  </TouchableOpacity>;
}

export default function App() {
  const [selectedTab, setSelectedTab] = useState('Início');
  const [barnSpace, setBarnSpace] = useState(125);

  return <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="dark-content" backgroundColor="#b9e98c" />
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>A TUA QUINTA, MAIS ORGANIZADA</Text>
        <Text style={styles.logo}>🌻 HayDay Helper</Text>
        <Text style={styles.welcome}>Olá, agricultor! Vamos fazer crescer a quinta?</Text>
        <View style={styles.levelRow}>
          <View><Text style={styles.smallLabel}>O TEU PROGRESSO</Text><Text style={styles.level}>Nível 32</Text></View>
          <View style={styles.xpPill}><Text style={styles.xpText}>⭐ 2 450 / 3 000 XP</Text></View>
        </View>
        <View style={styles.progress}><View style={styles.progressFill} /></View>
        <Text style={styles.demoNote}>Dados ilustrativos — personalizáveis na aplicação.</Text>
      </View>
      <View style={styles.barnCard}>
        <View><Text style={styles.sectionTitle}>📦 O meu celeiro</Text><Text style={styles.barnSub}>Espaço utilizado (demonstração)</Text></View>
        <View style={styles.barnRight}>
          <Text style={styles.barnCount}>{barnSpace} / 200</Text>
          <View style={styles.counterRow}>
            <TouchableOpacity accessibilityLabel="Diminuir espaço usado" style={styles.counter} onPress={() => setBarnSpace(v => Math.max(0, v - 1))}><Text style={styles.counterText}>−</Text></TouchableOpacity>
            <TouchableOpacity accessibilityLabel="Aumentar espaço usado" style={styles.counter} onPress={() => setBarnSpace(v => Math.min(200, v + 1))}><Text style={styles.counterText}>+</Text></TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={styles.sectionHeading}>Ferramentas da quinta</Text>
      <View style={styles.grid}>{tools.map(item => <ToolCard key={item.title} item={item} onPress={() => setSelectedTab(item.title)} />)}</View>
      <View style={styles.tip}><Text style={styles.tipTitle}>💡 Dica da quinta</Text><Text style={styles.tipText}>Organiza o celeiro antes de começares uma sessão de produção para aproveitares melhor o espaço!</Text></View>
      <Text style={styles.footer}>HayDay Helper • Projeto independente feito por fãs</Text>
    </ScrollView>
    <View style={styles.nav}>
      {['Início', 'Estatísticas', 'Eventos', 'Ferramentas'].map(label => <TouchableOpacity key={label} onPress={() => setSelectedTab(label)} style={styles.navItem}>
        <Text style={[styles.navText, selectedTab === label && styles.navActive]}>{label === 'Início' ? '🏡' : label === 'Estatísticas' ? '📊' : label === 'Eventos' ? '🎉' : '🧰'}{'\n'}{label}</Text>
      </TouchableOpacity>)}
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#f7f2df'}, page:{padding:16,paddingBottom:24},
  hero:{backgroundColor:'#b9e98c',borderRadius:26,padding:20,borderWidth:3,borderColor:'#83c65b',marginBottom:16},
  eyebrow:{fontSize:10,fontWeight:'900',letterSpacing:1.4,color:'#416b32'}, logo:{fontSize:27,fontWeight:'900',color:'#315b2b',marginTop:8},
  welcome:{fontSize:14,color:'#42653a',marginTop:7,fontWeight:'600'}, levelRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:22},
  smallLabel:{fontSize:10,fontWeight:'900',color:'#547b42'},level:{fontSize:21,fontWeight:'900',color:'#315b2b'},
  xpPill:{backgroundColor:'#fff5ce',padding:9,borderRadius:18},xpText:{fontWeight:'800',color:'#765b20',fontSize:11},
  progress:{height:10,backgroundColor:'#e5f5d7',borderRadius:10,marginTop:10,overflow:'hidden'},progressFill:{width:'82%',height:'100%',backgroundColor:'#e8a93f',borderRadius:10},
  demoNote:{color:'#547b42',fontSize:10,marginTop:8},
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
  navItem:{alignItems:'center',flex:1},navText:{textAlign:'center',fontSize:10,color:'#93876e',fontWeight:'700',lineHeight:16},navActive:{color:'#4d913b'}
});
