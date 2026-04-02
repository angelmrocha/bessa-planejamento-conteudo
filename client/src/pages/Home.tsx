import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MessageCircle, Target, Instagram, ChevronDown, ChevronUp, LogOut, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

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
        theme: "Servidor público: você tem dinheiro a receber e não sabe.",
        hook: "Gancho emocional: 'Você pode ter valores acumulados'.",
        story: "Enquete: Você sabe se tem valores a receber como servidor público?"
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
        hook: "Urgência: preparação é essencial.",
        story: "Caixinha de perguntas: Qual é a sua maior preocupação com a reforma?"
      },
      {
        id: "3-2",
        day: "Quarta",
        editorial: "Agronegócio",
        format: "Carrossel",
        theme: "ITCMD progressivo: como a holding rural protege seu patrimônio.",
        hook: "Risco: sem planejamento, alíquotas podem aumentar.",
        story: "Enquete: Você conhece o ITCMD progressivo?"
      },
      {
        id: "3-3",
        day: "Sexta",
        editorial: "Institucional",
        format: "Post Normal",
        theme: "Mitos e verdades sobre planejamento sucessório no agro.",
        hook: "Educação: esclarecer conceitos errados.",
        story: "Pergunta aberta: Qual mito você gostaria que esclarecêssemos?"
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
        theme: "Professor: você tem direito a quinquênio e sexta-parte.",
        hook: "Informação valiosa: muitos não sabem.",
        story: "Enquete: Você conhece todos os seus direitos como professor?"
      },
      {
        id: "4-2",
        day: "Quarta",
        editorial: "Institucional",
        format: "Carrossel",
        theme: "Por que escolher a Bessa Sociedade de Advogados.",
        hook: "Confiança: valores e compromisso.",
        story: "Caixinha de perguntas: Qual é sua dúvida sobre nossos serviços?"
      },
      {
        id: "4-3",
        day: "Sexta",
        editorial: "Direito Tributário",
        format: "Post Normal",
        theme: "Reforma tributária: últimas notícias e impactos.",
        hook: "Atualização: manter audiência informada.",
        story: "Pergunta aberta: Qual aspecto da reforma mais te preocupa?"
      }
    ]
  }
];

interface PostNote {
  postId: string;
  status: string;
  date: string;
  observations: string;
  changes: string;
  performance: string;
  isSaving?: boolean;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, PostNote>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Carregar anotações do banco de dados
  const { data: notesData, isLoading: isLoadingNotes } = trpc.posts.getNotes.useQuery({ userId: 1 });

  useEffect(() => {
    if (notesData?.success && notesData?.data) {
      const notesMap: Record<string, PostNote> = {};
      notesData.data.forEach((note: any) => {
        notesMap[note.postId] = {
          postId: note.postId,
          status: note.status || "",
          date: note.publishDate || "",
          observations: note.observations || "",
          changes: note.changes || "",
          performance: note.performance || "",
          isSaving: false
        };
      });
      setNotes(notesMap);
    }
  }, [notesData]);

  const saveNoteMutation = trpc.posts.saveNote.useMutation({
    onSettled: (data, error) => {
      if (error) {
        console.error("Erro ao salvar:", error);
        toast.error("Erro ao salvar. Tente novamente.");
      } else if (data?.success) {
        toast.success("Anotações salvas com sucesso!");
      }
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setLocation("/login");
      return;
    }
    setIsLoading(isLoadingNotes);
  }, [isLoadingNotes, setLocation, notesData]);

  const handleSaveNote = async (postId: string) => {
    const note = notes[postId];
    if (!note) return;

    setNotes(prev => ({
      ...prev,
      [postId]: { ...prev[postId], isSaving: true }
    }));

    try {
      await saveNoteMutation.mutateAsync({
        postId,
        userId: 1,
        status: note.status,
        observations: note.observations,
        changes: note.changes,
        publishDate: note.date,
        performance: note.performance
      });

      setNotes(prev => ({
        ...prev,
        [postId]: { ...prev[postId], isSaving: false }
      }));
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setNotes(prev => ({
        ...prev,
        [postId]: { ...prev[postId], isSaving: false }
      }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setLocation("/login");
    toast.success("Desconectado com sucesso");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando anotações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Instagram className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Bessa Planejamento</h1>
              <p className="text-slate-600">Calendário de Conteúdo - Instagram</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        {/* Tabs por semana */}
        <Tabs defaultValue="week-1" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {weeks.map(week => (
              <TabsTrigger key={`week-${week.week}`} value={`week-${week.week}`}>
                Semana {week.week}
              </TabsTrigger>
            ))}
          </TabsList>

          {weeks.map(week => (
            <TabsContent key={`content-${week.week}`} value={`week-${week.week}`}>
              <div className="grid gap-4">
                {week.posts.map(post => {
                  const note = notes[post.id] || {
                    postId: post.id,
                    status: "",
                    date: "",
                    observations: "",
                    changes: "",
                    performance: "",
                    isSaving: false
                  };
                  const isExpanded = expandedPost === post.id;

                  return (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{post.day}</Badge>
                              <Badge className="bg-blue-100 text-blue-800">{post.format}</Badge>
                              <Badge variant="secondary">{post.editorial}</Badge>
                            </div>
                            <CardTitle className="text-lg">{post.theme}</CardTitle>
                            <CardDescription className="mt-2">{post.hook}</CardDescription>
                          </div>
                          <button
                            onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                            className="ml-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </CardHeader>

                      {isExpanded && (
                        <CardContent className="space-y-4 border-t pt-4">
                          {/* Story sugerida */}
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              <MessageCircle className="w-4 h-4 inline mr-2" />
                              Story Sugerida
                            </label>
                            <p className="text-slate-600 bg-slate-50 p-3 rounded-lg">{post.story}</p>
                          </div>

                          {/* Status */}
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Status
                            </label>
                            <Select value={note.status} onValueChange={(value) => {
                              setNotes(prev => ({
                                ...prev,
                                [post.id]: { ...prev[post.id], status: value }
                              }));
                            }}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="planejado">Planejado</SelectItem>
                                <SelectItem value="em-producao">Em Produção</SelectItem>
                                <SelectItem value="publicado">Publicado</SelectItem>
                                <SelectItem value="aguardando">Aguardando Aprovação</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Data de publicação */}
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              <Calendar className="w-4 h-4 inline mr-2" />
                              Data de Publicação
                            </label>
                            <input
                              type="date"
                              value={note.date}
                              onChange={(e) => {
                                setNotes(prev => ({
                                  ...prev,
                                  [post.id]: { ...prev[post.id], date: e.target.value }
                                }));
                              }}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          {/* Observações */}
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Observações
                            </label>
                            <Textarea
                              value={note.observations}
                              onChange={(e) => {
                                setNotes(prev => ({
                                  ...prev,
                                  [post.id]: { ...prev[post.id], observations: e.target.value }
                                }));
                              }}
                              placeholder="Adicione observações sobre este post..."
                              className="min-h-20"
                            />
                          </div>

                          {/* Alterações sugeridas */}
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Alterações Sugeridas
                            </label>
                            <Textarea
                              value={note.changes}
                              onChange={(e) => {
                                setNotes(prev => ({
                                  ...prev,
                                  [post.id]: { ...prev[post.id], changes: e.target.value }
                                }));
                              }}
                              placeholder="Descreva as alterações necessárias..."
                              className="min-h-20"
                            />
                          </div>

                          {/* Desempenho */}
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              <Target className="w-4 h-4 inline mr-2" />
                              Desempenho
                            </label>
                            <Textarea
                              value={note.performance}
                              onChange={(e) => {
                                setNotes(prev => ({
                                  ...prev,
                                  [post.id]: { ...prev[post.id], performance: e.target.value }
                                }));
                              }}
                              placeholder="Registre o desempenho do post (salvamentos, compartilhamentos, etc)..."
                              className="min-h-20"
                            />
                          </div>

                          {/* Botão Salvar */}
                          <Button
                            onClick={() => handleSaveNote(post.id)}
                            disabled={note.isSaving}
                            className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                          >
                            <Save className="w-4 h-4" />
                            {note.isSaving ? "Salvando..." : "Salvar Anotações"}
                          </Button>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
