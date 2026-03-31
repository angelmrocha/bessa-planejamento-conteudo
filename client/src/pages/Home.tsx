import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, Target, Instagram } from "lucide-react";

const weeks = [
  {
    week: 1,
    posts: [
      {
        day: "Segunda",
        editorial: "Agronegócio",
        format: "Carrossel",
        theme: "Reforma tributária 2026: 5 impactos diretos no agronegócio que você precisa saber agora.",
        hook: "Problema: produtores rurais despreparados para as mudanças.",
        story: "Enquete: Você sabia que a reforma tributária afeta o agronegócio? (Sim/Não)"
      },
      {
        day: "Quarta",
        editorial: "Institucional",
        format: "Post Normal",
        theme: "Bessa Sociedade de Advogados: a importância da advocacia preventiva no agro.",
        hook: "Autoridade/Educação: foco na expertise do escritório.",
        story: "Caixinha de perguntas: Dúvidas sobre a reforma tributária para empresas?"
      },
      {
        day: "Sexta",
        editorial: "Direito Tributário",
        format: "Carrossel",
        theme: "Reforma tributária: o guia completo para empresas se prepararem para 2026.",
        hook: "Risco: empresas que não se prepararem podem sofrer prejuízos.",
        story: "Pergunta aberta: Qual o maior desafio do seu negócio com a reforma tributária?"
      }
    ]
  },
  {
    week: 2,
    posts: [
      {
        day: "Segunda",
        editorial: "Agronegócio",
        format: "Post Normal",
        theme: "O que é holding rural e por que ela é essencial para o seu negócio?",
        hook: "Simplicidade: explicar um conceito complexo de forma acessível.",
        story: "Enquete: Você já pensou em holding rural para proteger seu patrimônio?"
      },
      {
        day: "Quarta",
        editorial: "Institucional",
        format: "Carrossel",
        theme: "Bessa Sociedade de Advogados: expertise no agronegócio para a sua segurança jurídica.",
        hook: "Autoridade: reforçar a especialização do escritório.",
        story: "Caixinha de perguntas: Servidor público, você conhece seus direitos a valores acumulados?"
      },
      {
        day: "Sexta",
        editorial: "Direito Público/Previdenciário",
        format: "Post Normal",
        theme: "Servidor público: você pode ter dinheiro esquecido! Entenda o quinquênio e a sexta-parte.",
        hook: "Problema: servidores desconhecem seus direitos e valores a receber.",
        story: "Frase de impacto: Não deixe seu dinheiro esquecido!"
      }
    ]
  },
  {
    week: 3,
    posts: [
      {
        day: "Segunda",
        editorial: "Direito Tributário",
        format: "Post Normal",
        theme: "Sua empresa está pronta para a reforma tributária?",
        hook: "Risco: questionar a preparação da empresa para a reforma.",
        story: "Enquete: Sua empresa está preparada para as mudanças tributárias de 2026?"
      },
      {
        day: "Quarta",
        editorial: "Agronegócio",
        format: "Carrossel",
        theme: "ITCMD progressivo: como a nova regra de imposto sobre herança afeta o produtor rural.",
        hook: "Risco: alertar sobre a progressão do ITCMD e a importância do planejamento.",
        story: "Caixinha de perguntas: Produtor rural, qual sua maior preocupação com o ITCMD progressivo?"
      },
      {
        day: "Sexta",
        editorial: "Institucional",
        format: "Post Normal",
        theme: "Mitos e verdades sobre a reforma tributária e o produtor rural.",
        hook: "Autoridade/Educação: desmistificar informações sobre a reforma.",
        story: "Curiosidade: Mitos e verdades sobre a reforma tributária que você precisa desvendar."
      }
    ]
  },
  {
    week: 4,
    posts: [
      {
        day: "Segunda",
        editorial: "Direito Público/Previdenciário",
        format: "Post Normal",
        theme: "Professor, você tem dinheiro para receber e não sabe!",
        hook: "Problema/Direção: alertar sobre valores acumulados e a possibilidade de recebê-los.",
        story: "Enquete: Professor, você já revisou sua aposentadoria?"
      },
      {
        day: "Quarta",
        editorial: "Institucional",
        format: "Carrossel",
        theme: "Por que escolher a Bessa Sociedade de Advogados? Nossos valores e compromisso.",
        hook: "Confiança: apresentar os diferenciais do escritório.",
        story: "Caixinha de perguntas: Qual valor você mais busca em um escritório de advocacia?"
      },
      {
        day: "Sexta",
        editorial: "Direito Tributário",
        format: "Post Normal",
        theme: "Bessa Sociedade de Advogados: expertise para a segurança fiscal da sua empresa.",
        hook: "Autoridade: destacar a especialização do escritório em direito tributário.",
        story: "Chamada para ação: Conheça a Bessa Sociedade de Advogados e proteja seu futuro."
      }
    ]
  }
];

const getEditorialColor = (editorial: string) => {
  switch (editorial) {
    case "Agronegócio":
      return "bg-green-100 text-green-800 border-green-300";
    case "Direito Tributário":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "Institucional":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "Direito Público/Previdenciário":
      return "bg-orange-100 text-orange-800 border-orange-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getFormatColor = (format: string) => {
  return format === "Carrossel" ? "bg-indigo-50 text-indigo-700" : "bg-cyan-50 text-cyan-700";
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Bessa Sociedade de Advogados</h1>
              <p className="text-slate-600">Planejamento de Conteúdo - Mês 1 (Instagram)</p>
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed">
            Estratégia de consolidação de autoridade e engajamento com 12 posts mensais (3 por semana), alternando entre Posts Normais e Carrosséis, com sugestões de stories diários para manter a audiência engajada.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Tabs */}
        <Tabs defaultValue="week-1" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="week-1">Semana 1</TabsTrigger>
            <TabsTrigger value="week-2">Semana 2</TabsTrigger>
            <TabsTrigger value="week-3">Semana 3</TabsTrigger>
            <TabsTrigger value="week-4">Semana 4</TabsTrigger>
          </TabsList>

          {weeks.map((weekData) => (
            <TabsContent key={`week-${weekData.week}`} value={`week-${weekData.week}`} className="space-y-6">
              <div className="grid gap-6">
                {weekData.posts.map((post, idx) => (
                  <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <CardTitle className="text-lg">{post.day}-feira</CardTitle>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className={getEditorialColor(post.editorial)}>
                              {post.editorial}
                            </Badge>
                            <Badge className={getFormatColor(post.format)}>
                              {post.format}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Tema */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Tema do Post:</h4>
                        <p className="text-slate-700 leading-relaxed">{post.theme}</p>
                      </div>

                      {/* Gancho */}
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <h4 className="font-semibold text-slate-900 mb-1 text-sm">Gancho/Foco:</h4>
                        <p className="text-slate-700 text-sm">{post.hook}</p>
                      </div>

                      {/* Story */}
                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-lg border border-pink-200">
                        <div className="flex items-start gap-2">
                          <MessageCircle className="w-4 h-4 text-pink-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-1 text-sm">Sugestão de Story:</h4>
                            <p className="text-slate-700 text-sm">{post.story}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Metas Section */}
        <section className="mt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Perspectivas e Metas para o Mês 1</h2>
            <p className="text-slate-600">Consolidação da base e autoridade no Instagram</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Engajamento Qualificado",
                description: "Aumento nos salvamentos e compartilhamentos dos posts do feed, indicando que o conteúdo é relevante e útil.",
                icon: "📌"
              },
              {
                title: "Interação nos Stories",
                description: "Crescimento nas respostas a enquetes e caixas de perguntas, demonstrando conexão com a audiência.",
                icon: "💬"
              },
              {
                title: "Crescimento Orgânico de Seguidores",
                description: "Aumento gradual de seguidores qualificados que chegam ao perfil e decidem acompanhar o conteúdo.",
                icon: "📈"
              },
              {
                title: "Organização Visual",
                description: "Estabelecimento de um padrão visual profissional e coeso, com a logo da Bessa em destaque, preparando o terreno para a entrada dos vídeos dos advogados no Mês 2.",
                icon: "🎨"
              }
            ].map((meta, idx) => (
              <Card key={idx} className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{meta.icon}</span>
                    <CardTitle className="text-lg">{meta.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">{meta.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
          <div className="flex items-start gap-4">
            <Target className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">Resumo Executivo</h3>
              <p className="leading-relaxed">
                Este planejamento de conteúdo foi estruturado para consolidar a autoridade da Bessa Sociedade de Advogados no Instagram durante o primeiro mês. Com 12 posts estrategicamente distribuídos (3 por semana) alternando entre Posts Normais e Carrosséis, complementados por sugestões de stories diários, o objetivo é criar uma presença digital consistente e profissional. O foco em conteúdo educativo sobre Agronegócio, Direito Tributário (Reforma 2026) e Direito Público/Previdenciário, sem a exposição direta dos advogados neste momento, prepara o terreno para a entrada dos vídeos no próximo mês. As métricas de sucesso serão medidas através do engajamento qualificado, interação nos stories, crescimento orgânico de seguidores e estabelecimento de um padrão visual profissional.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-16">
        <div className="container text-center">
          <p>© 2026 Bessa Sociedade de Advogados. Planejamento de Conteúdo Digital.</p>
        </div>
      </footer>
    </div>
  );
}
