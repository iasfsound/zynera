import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Loader2, CheckCircle2, Zap, TrendingUp, Target, Mail, User, Phone, Send, Calculator, Search } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface Question {
  id: string;
  question: string;
  type: "multiple" | "text";
  options?: string[];
}

interface Diagnosis {
  title: string;
  summary: string;
  recommendations: string[];
  priority: "high" | "medium" | "low";
  estimatedImpact: string;
}

interface Budget {
  title: string;
  summary: string;
  estimatedBudget: string;
  breakdown: string[];
  timeline: string;
  nextSteps: string[];
}

const flowFinderQuestions: Question[] = [
  {
    id: "1",
    question: "¿En qué sector opera tu empresa?",
    type: "multiple",
    options: ["Retail/E-commerce", "Servicios profesionales", "Manufactura", "Salud", "Educación", "Tecnología", "Otro"]
  },
  {
    id: "2",
    question: "¿Cuál es tu principal desafío operativo?",
    type: "multiple",
    options: [
      "Procesos manuales repetitivos",
      "Atención al cliente 24/7",
      "Gestión de datos y reportes",
      "Comunicación interna",
      "Ventas y marketing",
      "Otro"
    ]
  },
  {
    id: "3",
    question: "¿Cuántas horas semanales dedicas a tareas repetitivas?",
    type: "multiple",
    options: ["Menos de 5 horas", "5-15 horas", "15-30 horas", "Más de 30 horas"]
  },
  {
    id: "4",
    question: "¿Qué tipo de automatización te interesa más?",
    type: "multiple",
    options: [
      "Chatbots y atención al cliente",
      "Automatización de procesos (RPA)",
      "Análisis de datos con IA",
      "Integración de sistemas",
      "Todas las anteriores"
    ]
  },
  {
    id: "5",
    question: "Cuéntanos brevemente sobre tu negocio y objetivos",
    type: "text"
  }
];

const budgetQuestions: Question[] = [
  {
    id: "b1",
    question: "¿Qué tipo de automatización necesitas?",
    type: "multiple",
    options: [
      "Chatbot para atención al cliente",
      "Automatización de procesos (RPA)",
      "Integración de sistemas/APIs",
      "Análisis de datos con IA",
      "Automatización de marketing",
      "Sistema completo (múltiples áreas)",
      "No estoy seguro, necesito asesoramiento"
    ]
  },
  {
    id: "b2",
    question: "¿Cuál es el tamaño de tu empresa?",
    type: "multiple",
    options: [
      "Autónomo/Freelancer",
      "Pequeña empresa (1-10 empleados)",
      "Mediana empresa (11-50 empleados)",
      "Gran empresa (50+ empleados)"
    ]
  },
  {
    id: "b3",
    question: "¿Cuántos usuarios/clientes atiendes aproximadamente al mes?",
    type: "multiple",
    options: [
      "Menos de 100",
      "100-500",
      "500-2000",
      "Más de 2000"
    ]
  },
  {
    id: "b4",
    question: "¿Qué sistemas o plataformas usas actualmente? (CRM, ERP, e-commerce, etc.)",
    type: "text"
  },
  {
    id: "b5",
    question: "¿Cuál es tu presupuesto aproximado para este proyecto?",
    type: "multiple",
    options: [
      "Menos de 1.000€",
      "1.000€ - 3.000€",
      "3.000€ - 10.000€",
      "10.000€ - 25.000€",
      "Más de 25.000€",
      "Prefiero no indicarlo"
    ]
  },
  {
    id: "b6",
    question: "¿Cuándo te gustaría tener la solución implementada?",
    type: "multiple",
    options: [
      "Lo antes posible (1-2 meses)",
      "En 3-6 meses",
      "En 6-12 meses",
      "Más de un año",
      "Solo explorando opciones"
    ]
  },
  {
    id: "b7",
    question: "Cuéntanos más detalles sobre tu proyecto y necesidades específicas",
    type: "text"
  }
];

export function FlowFinder() {
  const [mode, setMode] = useState<"flowfinder" | "presupuesto" | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "" });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const questions = mode === "presupuesto" ? budgetQuestions : flowFinderQuestions;

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "/api";
      const endpoint = mode === "presupuesto" ? "budget" : "diagnosis";
      
      const response = await fetch(`${apiUrl}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: Object.entries(answers).map(([questionId, answer]) => {
            const question = questions.find(q => q.id === questionId);
            return {
              question: question?.question || "",
              answer: answer
            };
          })
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al generar el ${mode === "presupuesto" ? "presupuesto" : "diagnóstico"}`);
      }

      const data = await response.json();
      
      if (mode === "presupuesto") {
        setBudget(data.budget);
      } else {
        setDiagnosis(data.diagnosis);
      }
      
      setShowLeadForm(true);
    } catch (err) {
      setError(`No se pudo generar el ${mode === "presupuesto" ? "presupuesto" : "diagnóstico"}. Por favor, intenta de nuevo.`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "/api";
      const response = await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone || undefined,
          diagnosis: diagnosis || null,
          budget: budget || null,
          mode: mode,
          answers: Object.entries(answers).map(([questionId, answer]) => {
            const question = questions.find(q => q.id === questionId);
            return {
              question: question?.question || "",
              answer: answer
            };
          })
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar tus datos");
      }

      setLeadSubmitted(true);
    } catch (err) {
      setError("No se pudieron enviar tus datos. Por favor, intenta de nuevo.");
      console.error(err);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handleReset = () => {
    setMode(null);
    setCurrentStep(0);
    setAnswers({});
    setDiagnosis(null);
    setBudget(null);
    setError(null);
    setShowLeadForm(false);
    setLeadData({ name: "", email: "", phone: "" });
    setLeadSubmitted(false);
  };

  const progress = mode ? ((currentStep + 1) / questions.length) * 100 : 0;

  return (
    <section id="flow-finder" className="relative z-10 px-6 py-20 md:py-32 bg-gradient-to-b from-white to-[#F6F8FA]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-[#E4E7EB] shadow-xl overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#00E4FF]/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#147BFF]/10 to-transparent rounded-full blur-3xl" />

            <div className="relative">
              {!mode ? (
                /* Pantalla inicial - Selección de modo */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-8"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 border border-[#00E4FF]/20 mb-4">
                    <Sparkles className="w-4 h-4 text-[#00E4FF]" />
                    <span className="text-sm text-gray-700 font-medium">Asistente Zynera</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    ¿En qué podemos ayudarte?
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                    Elige la herramienta que mejor se adapte a tus necesidades
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {/* Botón Flow Finder */}
                    <motion.button
                      onClick={() => setMode("flowfinder")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative p-8 bg-gradient-to-br from-white to-[#F9FAFB] border-2 border-[#E4E7EB] rounded-2xl hover:border-[#00E4FF] transition-all hover:shadow-xl text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00E4FF] to-[#147BFF] flex items-center justify-center flex-shrink-0">
                          <Search className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Flow Finder</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Descubre qué procesos de tu negocio pueden automatizarse con IA
                          </p>
                          <div className="flex items-center gap-2 text-[#00E4FF] font-medium text-sm">
                            Comenzar
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </motion.button>

                    {/* Botón Generador de Presupuesto */}
                    <motion.button
                      onClick={() => setMode("presupuesto")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative p-8 bg-gradient-to-br from-white to-[#F9FAFB] border-2 border-[#E4E7EB] rounded-2xl hover:border-[#00E4FF] transition-all hover:shadow-xl text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00E4FF] to-[#147BFF] flex items-center justify-center flex-shrink-0">
                          <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Generador de Presupuesto</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Obtén un presupuesto orientativo personalizado para tu proyecto
                          </p>
                          <div className="flex items-center gap-2 text-[#00E4FF] font-medium text-sm">
                            Comenzar
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              ) : !diagnosis && !budget ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 border border-[#00E4FF]/20 mb-4">
                      {mode === "presupuesto" ? (
                        <Calculator className="w-4 h-4 text-[#00E4FF]" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-[#00E4FF]" />
                      )}
                      <span className="text-sm text-gray-700 font-medium">
                        {mode === "presupuesto" ? "Generador de Presupuesto" : "Asistente de Diagnóstico"}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                      {mode === "presupuesto" ? "Presupuesto Orientativo" : "Flow Finder"}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      {mode === "presupuesto" 
                        ? "Completa el cuestionario para recibir un presupuesto personalizado"
                        : "Descubre qué procesos de tu negocio pueden automatizarse con IA en menos de 2 minutos"
                      }
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Pregunta {currentStep + 1} de {questions.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#00E4FF] to-[#147BFF]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Questions */}
                  <AnimatePresence mode="wait">
                    {!isLoading && (
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
                          {questions[currentStep].question}
                        </h3>

                        {questions[currentStep].type === "multiple" ? (
                          <div className="grid gap-3">
                            {questions[currentStep].options?.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleAnswer(questions[currentStep].id, option)}
                                className="group relative px-6 py-4 text-left bg-[#F9FAFB] border-2 border-[#E4E7EB] rounded-xl hover:border-[#00E4FF] hover:bg-gradient-to-r hover:from-[#00E4FF]/5 hover:to-[#147BFF]/5 transition-all hover:shadow-md"
                              >
                                <span className="relative z-10 text-gray-700 group-hover:text-gray-900 font-medium">
                                  {option}
                                </span>
                                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-[#00E4FF] opacity-0 group-hover:opacity-100 transition-all" />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <textarea
                              placeholder="Escribe tu respuesta aquí..."
                              className="w-full px-4 py-3 rounded-xl border-2 border-[#E4E7EB] bg-[#F9FAFB] focus:outline-none focus:border-[#00E4FF] focus:ring-2 focus:ring-[#00E4FF]/20 transition-all resize-none"
                              rows={5}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && e.ctrlKey) {
                                  const value = (e.target as HTMLTextAreaElement).value.trim();
                                  if (value) {
                                    handleAnswer(questions[currentStep].id, value);
                                  }
                                }
                              }}
                            />
                            <button
                              onClick={() => {
                                const textarea = document.querySelector("textarea");
                                const value = textarea?.value.trim();
                                if (value) {
                                  handleAnswer(questions[currentStep].id, value);
                                }
                              }}
                              className="w-full px-6 py-4 bg-gradient-to-r from-[#00E4FF] to-[#147BFF] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#00E4FF]/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                            >
                              Continuar
                              <ArrowRight className="w-5 h-5" />
                            </button>
                            <p className="text-sm text-gray-500 text-center">
                              Presiona Ctrl + Enter para continuar
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Loading state */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <Loader2 className="w-12 h-12 text-[#00E4FF] animate-spin mx-auto mb-4" />
                      <p className="text-lg text-gray-700 font-medium">
                        Analizando tus respuestas con IA...
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Esto puede tardar unos segundos
                      </p>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center"
                    >
                      {error}
                      <button
                        onClick={handleReset}
                        className="mt-2 text-sm underline hover:no-underline"
                      >
                        Intentar de nuevo
                      </button>
                    </motion.div>
                  )}
                </>
              ) : !leadSubmitted && (diagnosis || budget) ? (
                /* Summary and Lead Form */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#00E4FF] to-[#147BFF] rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {budget ? budget.title : "Zynera detectó que puedes automatizar:"}
                    </h2>
                    {budget && (
                      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {budget.summary}
                      </p>
                    )}
                  </div>

                  {/* Summary - Diferente según el modo */}
                  {budget ? (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-[#00E4FF]/5 to-[#147BFF]/5 rounded-xl p-6 border border-[#00E4FF]/20">
                        <div className="flex items-center gap-3 mb-4">
                          <Calculator className="w-6 h-6 text-[#00E4FF]" />
                          <h3 className="text-xl font-bold text-gray-900">Presupuesto Estimado</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{budget.estimatedBudget}</p>
                        <p className="text-sm text-gray-600 mt-2">Presupuesto orientativo basado en tus necesidades</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-[#F9FAFB] rounded-xl p-6 border border-[#E4E7EB]">
                          <h4 className="font-semibold text-gray-900 mb-3">Desglose</h4>
                          <ul className="space-y-2">
                            {budget.breakdown.map((item, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-[#00E4FF]">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-[#F9FAFB] rounded-xl p-6 border border-[#E4E7EB]">
                          <h4 className="font-semibold text-gray-900 mb-3">Plazo Estimado</h4>
                          <p className="text-gray-700">{budget.timeline}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-[#00E4FF]/5 to-[#147BFF]/5 rounded-xl p-6 border border-[#00E4FF]/20 mb-6">
                      <ul className="space-y-4">
                        {diagnosis?.recommendations.slice(0, 3).map((rec, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00E4FF] to-[#147BFF] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs font-bold">{index + 1}</span>
                            </div>
                            <p className="text-gray-700 flex-1 text-lg">{rec}</p>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-[#F9FAFB] rounded-xl p-6 border border-[#E4E7EB] text-center">
                    <p className="text-gray-700 mb-2">
                      {budget 
                        ? "Para recibir el <strong>presupuesto completo detallado</strong> y propuesta personalizada, deja tus datos."
                        : "Para recibir un <strong>informe completo personalizado</strong> con ROI y propuestas concretas, deja tus datos."
                      }
                    </p>
                  </div>

                  {/* Lead Form */}
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadData.name}
                        onChange={(e) => setLeadData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Tu nombre completo"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#E4E7EB] bg-white focus:outline-none focus:border-[#00E4FF] focus:ring-2 focus:ring-[#00E4FF]/20 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={leadData.email}
                        onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#E4E7EB] bg-white focus:outline-none focus:border-[#00E4FF] focus:ring-2 focus:ring-[#00E4FF]/20 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Teléfono / WhatsApp (opcional)
                      </label>
                      <input
                        type="tel"
                        value={leadData.phone}
                        onChange={(e) => setLeadData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+34 123 456 789"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#E4E7EB] bg-white focus:outline-none focus:border-[#00E4FF] focus:ring-2 focus:ring-[#00E4FF]/20 transition-all"
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full px-6 py-4 bg-gradient-to-r from-[#00E4FF] to-[#147BFF] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#00E4FF]/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmittingLead ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Recibir informe completo
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                /* Success Message */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#00E4FF] to-[#147BFF] rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    ¡Informe enviado!
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Hemos enviado tu informe completo personalizado a <strong>{leadData.email}</strong>
                  </p>
                  <p className="text-gray-500">
                    Revisa tu bandeja de entrada (y spam) en los próximos minutos.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-8 py-4 bg-gradient-to-r from-[#00E4FF] to-[#147BFF] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#00E4FF]/25 transition-all hover:scale-105"
                    >
                      Realizar otro diagnóstico
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

