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
        theme: "Mitos e verdades sobre a reforma tributária rural.",
        hook: "Educação: esclarecer conceitos errados sobre a reforma.",
        story: "Pergunta aberta: Qual mito sobre a reforma tributária você gostaria que esclarecêssemos?"
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
        theme: "Professor, você tem dinheiro a receber! Saiba como consultar seus valores acumulados.",
        hook: "Problema: professores desconhecem seus direitos.",
        story: "Enquete: Você já consultou seus valores acumulados como professor?"
      },
      {
        id: "4-2",
        day: "Quarta",
        editorial: "Institucional",
        format: "Carrossel",
        theme: "Por que escolher a Bessa Sociedade de Advogados para sua segurança jurídica?",
        hook: "Autoridade: reforçar a confiança no escritório.",
        story: "Caixinha de perguntas: Qual sua maior dúvida sobre planejamento tributário?"
      },
      {
        id: "4-3",
        day: "Sexta",
        editorial: "Agronegócio",
        format: "Carrossel",
        theme: "Sucessão rural: como proteger o patrimônio da sua família.",
        hook: "Risco: alertar sobre a importância do planejamento sucessório.",
        story: "Pergunta aberta: Qual sua principal preocupação com a sucessão do seu negócio?"
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
  isSaving: boolean;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, PostNote>>({});
  const [isSavingAll, setIsSavingAll] = useState(false);

  // Verificar autenticação
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setLocation("/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setLocation("/login");
  };

  const handleSaveNote = async (postId: string) => {
    const note = notes[postId];
    if (!note) return;

    setNotes(prev => ({
      ...prev,
      [postId]: { ...prev[postId], isSaving: true }
    }));

    try {
      // Simular salvamento (em produção, seria uma chamada tRPC)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success(`Post ${postId} salvo com sucesso!`);
      
      setNotes(prev => ({
        ...prev,
        [postId]: { ...prev[postId], isSaving: false }
      }));
    } catch (error) {
      toast.error("Erro ao salvar");
      setNotes(prev => ({
        ...prev,
        [postId]: { ...prev[postId], isSaving: false }
      }));
    }
  };

  const updateNote = (postId: string, field: string, value: string) => {
    setNotes(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId] || { postId, status: "", date: "", observations: "", changes: "", performance: "", isSaving: false },
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Bessa Sociedade de Advogados</h1>
              <p className="text-sm text-gray-600">Planejamento de Conteúdo - Mês 1 (Instagram)</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Calendário de Conteúdo - 12 Posts Mensais</CardTitle>
            <CardDescription>
              Estratégia de consolidação de autoridade e engajamento com 12 posts (3 por semana), alternando entre Posts Normais e Carrosséis, com sugestões de stories diários para manter a audiência engajada.
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="week-1" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {weeks.map((w) => (
              <TabsTrigger key={w.week} value={`week-${w.week}`}>
                Semana {w.week}
              </TabsTrigger>
            ))}
          </TabsList>

          {weeks.map((week) => (
            <TabsContent key={week.week} value={`week-${week.week}`} className="space-y-6">
              {week.posts.map((post) => {
                const note = notes[post.id] || { postId: post.id, status: "", date: "", observations: "", changes: "", performance: "", isSaving: false };
                const isExpanded = expandedPost === post.id;

                return (
                  <Card key={post.id} className="overflow-hidden hover:shadow-md transition">
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50 transition"
                      onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">{post.day}-feira</h3>
                            <Badge variant="outline">{post.format}</Badge>
                            <Badge variant="secondary">{post.editorial}</Badge>
                          </div>
                          <p className="text-gray-700 font-medium mb-2">{post.theme}</p>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p><span className="font-semibold">Gancho/Foco:</span> {post.hook}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-gray-200 p-6 bg-gray-50 space-y-6">
                        {/* Story Suggestion */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex items-start gap-2 mb-2">
                            <MessageCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-semibold text-gray-900">Sugestão de Story:</p>
                              <p className="text-gray-700 mt-1">{post.story}</p>
                            </div>
                          </div>
                        </div>

                        {/* Annotations Section */}
                        <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Target className="w-5 h-5" />
                            Anotações e Observações
                          </h4>

                          {/* Status */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Status</label>
                            <Select value={note.status} onValueChange={(value) => updateNote(post.id, "status", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="planejado">Planejado</SelectItem>
                                <SelectItem value="producao">Em Produção</SelectItem>
                                <SelectItem value="aprovacao">Aguardando Aprovação</SelectItem>
                                <SelectItem value="publicado">Publicado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Data */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Data de Publicação</label>
                            <input
                              type="date"
                              value={note.date}
                              onChange={(e) => updateNote(post.id, "date", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          {/* Observations */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Observações</label>
                            <Textarea
                              value={note.observations}
                              onChange={(e) => updateNote(post.id, "observations", e.target.value)}
                              placeholder="Adicione observações sobre este post..."
                              className="w-full min-h-24"
                            />
                          </div>

                          {/* Changes */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Alterações Sugeridas</label>
                            <Textarea
                              value={note.changes}
                              onChange={(e) => updateNote(post.id, "changes", e.target.value)}
                              placeholder="Descreva as alterações necessárias..."
                              className="w-full min-h-24"
                            />
                          </div>

                          {/* Performance */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Desempenho</label>
                            <Textarea
                              value={note.performance}
                              onChange={(e) => updateNote(post.id, "performance", e.target.value)}
                              placeholder="Registre dados de desempenho (salvamentos, compartilhamentos, etc)..."
                              className="w-full min-h-24"
                            />
                          </div>

                          {/* Save Button */}
                          <Button
                            onClick={() => handleSaveNote(post.id)}
                            disabled={note.isSaving}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                          >
                            {note.isSaving ? (
                              <>
                                <span className="animate-spin">⏳</span>
                                Salvando...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                Salvar Anotações
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
