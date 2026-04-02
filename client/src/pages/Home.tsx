import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MessageCircle, Target, Instagram, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

const weeks = [
  {
    week: 1,
    posts: [
      {
        id: "1-1",
        day: "Segunda",
        editorial: "Agronegócio",
        format: "Carrossel",
        theme: "Reforma tributária 2026: 5 impactos diretos no agronegócio que você precisa saber agora.",
        hook: "Problema: produtores rurais despreparados para as mudanças.",
        story: "Enquete: Você sabia que a reforma tributária afeta o agronegócio? (Sim/Não)"
      },
      {
        id: "1-2",
        day: "Quarta",
        editorial: "Institucional",
        format: "Post Normal",
        theme: "Bessa Sociedade de Advogados: a importância da advocacia preventiva no agro.",
        hook: "Autoridade/Educação: foco na expertise do escritório.",
        story: "Caixinha de perguntas: Dúvidas sobre a reforma tributária para empresas?"
      },
      {
        id: "1-3",
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
        id: "2-1",
        day: "Segunda",
        editorial: "Agronegócio",
        format: "Post Normal",
        theme: "O que é holding rural e por que ela é essencial para o seu negócio?",
        hook: "Simplicidade: explicar um conceito complexo de forma acessível.",
        story: "Enquete: Você já pensou em holding rural para proteger seu patrimônio?"
      },
      {
        id: "2-2",
        day: "Quarta",
        editorial: "Institucional",
        format: "Carrossel",
        theme: "Bessa Sociedade de Advogados: expertise no agronegócio para a sua segurança jurídica.",
        hook: "Autoridade: reforçar a especialização do escritório.",
        story: "Caixinha de perguntas: Servidor público, você conhece seus direitos a valores acumulados?"
      },
      {
        id: "2-3",
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
        id: "3-1",
        day: "Segunda",
        editorial: "Direito Tributário",
        format: "Post Normal",
        theme: "Sua empresa está pronta para a reforma tributária?",
        hook: "Risco: questionar a preparação da empresa para a reforma.",
        story: "Enquete: Sua empresa está preparada para as mudanças tributárias de 2026?"
      },
      {
        id: "3-2",
        day: "Quarta",
        editorial: "Agronegócio",
        format: "Carrossel",
        theme: "ITCMD progressivo: como a nova regra de imposto sobre herança afeta o produtor rural.",
        hook: "Risco: alertar sobre a progressão do ITCMD e a importância do planejamento.",
        story: "Caixinha de perguntas: Produtor rural, qual sua maior preocupação com o ITCMD progressivo?"
      },
      {
        id: "3-3",
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
        id: "4-1",
        day: "Segunda",
        editorial: "Direito Público/Previdenciário",
        format: "Post Normal",
        theme: "Professor, você tem dinheiro para receber e não sabe!",
        hook: "Problema/Direção: alertar sobre valores acumulados e a possibilidade de recebê-los.",
        story: "Enquete: Professor, você já revisou sua aposentadoria?"
      },
      {
        id: "4-2",
        day: "Quarta",
        editorial: "Institucional",
        format: "Carrossel",
        theme: "Por que escolher a Bessa Sociedade de Advogados? Nossos valores e compromisso.",
        hook: "Confiança: apresentar os diferenciais do escritório.",
        story: "Caixinha de perguntas: Qual valor você mais busca em um escritório de advocacia?"
      },
      {
        id: "4-3",
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

interface PostNotes {
  [key: string]: {
    status: string;
    observations: string;
    changes: string;
    publishDate: string;
    performance: string;
  };
}

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "publicado":
      return "bg-green-100 text-green-800";
    case "em-producao":
      return "bg-yellow-100 text-yellow-800";
    case "aguardando":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function Home() {
  let { user, loading, isAuthenticated } = useAuth();

  const [postNotes, setPostNotes] = useState<PostNotes>({});
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const saveNoteMutation = trpc.posts.saveNote.useMutation();
  const getNotesQuery = trpc.posts.getNotes.useQuery(
    { userId: user?.id || 0 },
    { enabled: !!user?.id }
  );

  // Carregar dados do banco de dados ao montar
  useEffect(() => {
    if (user?.id && getNotesQuery.data?.data) {
      const notesFromDb = getNotesQuery.data.data;
      const notesMap: PostNotes = {};
      
      notesFromDb.forEach((note: any) => {
        notesMap[note.postId] = {
          status: note.status || "planejado",
          observations: note.observations || "",
          changes: note.changes || "",
          publishDate: note.publishDate || "",
          performance: note.performance || ""
        };
      });
      
      setPostNotes(notesMap);
    }
  }, [user?.id, getNotesQuery.data]);

  const updatePostNote = async (postId: string, field: string, value: string) => {
    // Atualizar estado local
    setPostNotes(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [field]: value
      }
    }));

    // Salvar no banco de dados
    if (user?.id) {
      try {
        const currentNote = postNotes[postId] || {
          status: "planejado",
          observations: "",
          changes: "",
          publishDate: "",
          performance: ""
        };

        await saveNoteMutation.mutateAsync({
          postId,
          userId: user.id,
          status: field === "status" ? value : currentNote.status,
          observations: field === "observations" ? value : currentNote.observations,
          changes: field === "changes" ? value : currentNote.changes,
          publishDate: field === "publishDate" ? value : currentNote.publishDate,
          performance: field === "performance" ? value : currentNote.performance
        });

        toast.success("Anotação salva com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar anotação:", error);
        toast.error("Erro ao salvar anotação");
      }
    }
  };

  const getPostNote = (postId: string) => {
    return postNotes[postId] || {
      status: "planejado",
      observations: "",
      changes: "",
      publishDate: "",
      performance: ""
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Acesso Restrito</CardTitle>
            <CardDescription>Você precisa fazer login para acessar o planejamento de conteúdo.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href={getLoginUrl()}>Fazer Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Bessa Sociedade de Advogados</h1>
                <p className="text-slate-600">Planejamento de Conteúdo - Mês 1 (Instagram)</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">Logado como:</p>
              <p className="font-semibold text-slate-900">{user?.name || user?.email}</p>
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
                {weekData.posts.map((post) => {
                  const note = getPostNote(post.id);
                  const isExpanded = expandedPost === post.id;

                  return (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                              <Badge className={getStatusColor(note.status)}>
                                {note.status === "planejado" && "Planejado"}
                                {note.status === "em-producao" && "Em Produção"}
                                {note.status === "publicado" && "Publicado"}
                                {note.status === "aguardando" && "Aguardando Aprovação"}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
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

                        {/* Painel de Anotações (Expansível) */}
                        {isExpanded && (
                          <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
                            <h4 className="font-bold text-slate-900">Painel de Anotações e Observações</h4>

                            {/* Status */}
                            <div>
                              <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                              <Select value={note.status} onValueChange={(value) => updatePostNote(post.id, "status", value)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="planejado">Planejado</SelectItem>
                                  <SelectItem value="em-producao">Em Produção</SelectItem>
                                  <SelectItem value="publicado">Publicado</SelectItem>
                                  <SelectItem value="aguardando">Aguardando Aprovação</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Data de Publicação */}
                            <div>
                              <label className="block text-sm font-semibold text-slate-900 mb-2">Data de Publicação</label>
                              <input
                                type="date"
                                value={note.publishDate}
                                onChange={(e) => updatePostNote(post.id, "publishDate", e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            {/* Observações */}
                            <div>
                              <label className="block text-sm font-semibold text-slate-900 mb-2">Observações</label>
                              <Textarea
                                placeholder="Adicione observações sobre este post..."
                                value={note.observations}
                                onChange={(e) => updatePostNote(post.id, "observations", e.target.value)}
                                className="min-h-24"
                              />
                            </div>

                            {/* Alterações Sugeridas */}
                            <div>
                              <label className="block text-sm font-semibold text-slate-900 mb-2">Alterações Sugeridas</label>
                              <Textarea
                                placeholder="Descreva as alterações ou ajustes necessários..."
                                value={note.changes}
                                onChange={(e) => updatePostNote(post.id, "changes", e.target.value)}
                                className="min-h-24"
                              />
                            </div>

                            {/* Desempenho */}
                            <div>
                              <label className="block text-sm font-semibold text-slate-900 mb-2">Desempenho (Opcional)</label>
                              <Textarea
                                placeholder="Registre dados de desempenho: salvamentos, compartilhamentos, alcance, etc."
                                value={note.performance}
                                onChange={(e) => updatePostNote(post.id, "performance", e.target.value)}
                                className="min-h-24"
                              />
                            </div>

                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm text-blue-800">
                              ✓ Todas as anotações são salvas automaticamente no banco de dados
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
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
                Este planejamento de conteúdo foi estruturado para consolidar a autoridade da Bessa Sociedade de Advogados no Instagram durante o primeiro mês. Com 12 posts estrategicamente distribuídos (3 por semana) alternando entre Posts Normais e Carrosséis, complementados por sugestões de stories diários, o objetivo é criar uma presença digital consistente e profissional. O painel de anotações permite que a equipe responsável pela publicação registre observações, alterações, status e desempenho de cada post em tempo real, com todos os dados salvos automaticamente no banco de dados.
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
