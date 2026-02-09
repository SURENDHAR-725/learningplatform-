import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { 
  Brain, 
  Sparkles, 
  Clock, 
  Target, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  RotateCcw,
  Trophy,
  Loader2,
  Send,
  Timer,
  AlertCircle,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  answers: { questionId: number; userAnswer: number; isCorrect: boolean }[];
}

type QuizState = "setup" | "generating" | "quiz" | "results";

// AI-simulated question generation based on topic
const generateQuestionsForTopic = (topic: string, count: number, difficulty: string): Question[] => {
  // This simulates AI-generated questions. In production, this would call an AI API.
  const questionTemplates: Record<string, Question[]> = {
    javascript: [
      { id: 1, question: "What is the output of typeof null in JavaScript?", options: ["'null'", "'object'", "'undefined'", "'boolean'"], correctAnswer: 1, explanation: "In JavaScript, typeof null returns 'object'. This is a known bug in JavaScript that has been kept for backward compatibility." },
      { id: 2, question: "Which method is used to add elements to the end of an array?", options: ["unshift()", "push()", "pop()", "shift()"], correctAnswer: 1, explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array." },
      { id: 3, question: "What is a closure in JavaScript?", options: ["A function that returns another function", "A function bundled with its lexical scope", "A method to close browser windows", "A loop control structure"], correctAnswer: 1, explanation: "A closure is a function bundled together with references to its surrounding state (lexical environment)." },
      { id: 4, question: "What does 'use strict' do in JavaScript?", options: ["Makes code run faster", "Enables strict mode with additional error checking", "Compresses the code", "Enables TypeScript features"], correctAnswer: 1, explanation: "'use strict' enables strict mode which catches common coding mistakes and prevents unsafe actions." },
      { id: 5, question: "Which of the following is NOT a JavaScript data type?", options: ["Boolean", "Float", "Symbol", "BigInt"], correctAnswer: 1, explanation: "Float is not a JavaScript data type. JavaScript uses Number for all numeric values." },
      { id: 6, question: "What is event bubbling?", options: ["Creating multiple events", "Events propagating from child to parent", "Event memory leaks", "Asynchronous event handling"], correctAnswer: 1, explanation: "Event bubbling is when an event triggers on a nested element and propagates up through its ancestors." },
      { id: 7, question: "What is the purpose of the 'this' keyword?", options: ["To declare variables", "To reference the current object", "To import modules", "To create loops"], correctAnswer: 1, explanation: "The 'this' keyword refers to the object that is executing the current function." },
      { id: 8, question: "What is a Promise in JavaScript?", options: ["A guarantee of code execution", "An object representing eventual completion of async operation", "A loop structure", "A variable declaration"], correctAnswer: 1, explanation: "A Promise is an object representing the eventual completion or failure of an asynchronous operation." },
      { id: 9, question: "What is the difference between == and ===?", options: ["No difference", "=== checks type and value, == only checks value", "== is deprecated", "=== is faster"], correctAnswer: 1, explanation: "=== (strict equality) checks both type and value, while == (loose equality) performs type coercion before comparison." },
      { id: 10, question: "What is hoisting in JavaScript?", options: ["Moving code to the top of the file", "Moving declarations to the top of their scope", "Optimizing code performance", "A debugging technique"], correctAnswer: 1, explanation: "Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation." },
    ],
    react: [
      { id: 1, question: "What is the virtual DOM in React?", options: ["A browser feature", "A lightweight copy of the real DOM", "A CSS framework", "A testing tool"], correctAnswer: 1, explanation: "The virtual DOM is a lightweight JavaScript representation of the real DOM that React uses for efficient updates." },
      { id: 2, question: "What hook is used for side effects in React?", options: ["useState", "useEffect", "useContext", "useReducer"], correctAnswer: 1, explanation: "useEffect is used to perform side effects in functional components, such as data fetching or subscriptions." },
      { id: 3, question: "What is JSX?", options: ["A JavaScript library", "A syntax extension for JavaScript", "A CSS preprocessor", "A testing framework"], correctAnswer: 1, explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript files." },
      { id: 4, question: "What is the purpose of keys in React lists?", options: ["Styling elements", "Helping React identify which items changed", "Creating unique IDs", "Encrypting data"], correctAnswer: 1, explanation: "Keys help React identify which items in a list have changed, been added, or removed for efficient re-rendering." },
      { id: 5, question: "What is useState used for?", options: ["Managing component state", "Routing", "API calls", "Styling"], correctAnswer: 0, explanation: "useState is a Hook that lets you add state to functional components." },
      { id: 6, question: "What is prop drilling?", options: ["A testing technique", "Passing props through many component levels", "Creating new components", "Debugging props"], correctAnswer: 1, explanation: "Prop drilling is passing props through multiple levels of components to reach a deeply nested component." },
      { id: 7, question: "What is React.memo used for?", options: ["Memory management", "Memoizing components to prevent unnecessary re-renders", "Creating memos", "Documentation"], correctAnswer: 1, explanation: "React.memo is a higher-order component that memoizes a component to skip re-renders if props haven't changed." },
      { id: 8, question: "What is the Context API used for?", options: ["Creating APIs", "Sharing state across components without prop drilling", "Styling", "Testing"], correctAnswer: 1, explanation: "The Context API provides a way to share values between components without passing props manually at every level." },
      { id: 9, question: "What is a controlled component?", options: ["A component with access control", "A component where form data is handled by React state", "A styled component", "A tested component"], correctAnswer: 1, explanation: "A controlled component is a form element whose value is controlled by React state." },
      { id: 10, question: "What is the useCallback hook used for?", options: ["Making API calls", "Memoizing callback functions", "Creating callbacks", "Error handling"], correctAnswer: 1, explanation: "useCallback returns a memoized callback function that only changes if one of its dependencies has changed." },
    ],
    python: [
      { id: 1, question: "What is a Python decorator?", options: ["A design pattern", "A function that modifies another function", "A class attribute", "A loop structure"], correctAnswer: 1, explanation: "A decorator is a function that takes another function and extends its behavior without explicitly modifying it." },
      { id: 2, question: "What is the difference between a list and a tuple?", options: ["Lists are immutable", "Tuples are immutable", "No difference", "Lists use parentheses"], correctAnswer: 1, explanation: "Tuples are immutable (cannot be changed after creation), while lists are mutable." },
      { id: 3, question: "What is a lambda function in Python?", options: ["A named function", "An anonymous function", "A class method", "A module"], correctAnswer: 1, explanation: "A lambda function is a small anonymous function that can have any number of arguments but only one expression." },
      { id: 4, question: "What does the 'self' keyword represent?", options: ["The module", "The instance of the class", "A variable", "A method"], correctAnswer: 1, explanation: "'self' represents the instance of the class and is used to access class attributes and methods." },
      { id: 5, question: "What is a generator in Python?", options: ["A code generator tool", "A function that yields values one at a time", "A class factory", "An IDE plugin"], correctAnswer: 1, explanation: "A generator is a function that returns an iterator that yields values one at a time using the yield keyword." },
      { id: 6, question: "What is PEP 8?", options: ["A Python version", "Python style guide", "A Python library", "A testing framework"], correctAnswer: 1, explanation: "PEP 8 is the style guide for Python code that provides conventions for writing readable code." },
      { id: 7, question: "What is the GIL in Python?", options: ["A graphics library", "Global Interpreter Lock", "A GUI framework", "A garbage collector"], correctAnswer: 1, explanation: "The Global Interpreter Lock (GIL) is a mutex that protects access to Python objects, limiting threading efficiency." },
      { id: 8, question: "What is list comprehension?", options: ["Understanding lists", "A concise way to create lists", "A list method", "A debugging tool"], correctAnswer: 1, explanation: "List comprehension is a concise way to create lists using a single line of code with brackets and an expression." },
      { id: 9, question: "What is __init__ in Python?", options: ["A module", "The constructor method", "A private variable", "A destructor"], correctAnswer: 1, explanation: "__init__ is the constructor method that gets called when an object is instantiated." },
      { id: 10, question: "What is the difference between 'is' and '=='?", options: ["No difference", "'is' checks identity, '==' checks equality", "'is' is deprecated", "'==' checks identity"], correctAnswer: 1, explanation: "'is' checks if two variables reference the same object in memory, while '==' checks if their values are equal." },
    ],
    aws: [
      { id: 1, question: "What is Amazon EC2?", options: ["A database service", "A virtual server in the cloud", "A storage service", "A CDN service"], correctAnswer: 1, explanation: "Amazon EC2 (Elastic Compute Cloud) provides resizable virtual servers (instances) in the cloud." },
      { id: 2, question: "What is an S3 bucket?", options: ["A compute instance", "A container for storing objects", "A database table", "A network configuration"], correctAnswer: 1, explanation: "An S3 bucket is a container for storing objects (files) in Amazon Simple Storage Service." },
      { id: 3, question: "What is AWS Lambda?", options: ["A serverless compute service", "A database service", "A storage service", "A networking service"], correctAnswer: 0, explanation: "AWS Lambda is a serverless compute service that runs code without provisioning or managing servers." },
      { id: 4, question: "What is the purpose of IAM?", options: ["Image management", "Identity and Access Management", "Instance monitoring", "Internet access management"], correctAnswer: 1, explanation: "IAM (Identity and Access Management) manages access to AWS services and resources securely." },
      { id: 5, question: "What is Amazon RDS?", options: ["A managed relational database service", "A routing service", "A real-time data service", "A reporting service"], correctAnswer: 0, explanation: "Amazon RDS (Relational Database Service) is a managed service that makes it easy to set up and operate relational databases." },
      { id: 6, question: "What is a VPC in AWS?", options: ["Virtual Private Cloud", "Virtual Public Compute", "Very Private Connection", "Virtual Protocol Configuration"], correctAnswer: 0, explanation: "A VPC (Virtual Private Cloud) is a logically isolated virtual network in AWS." },
      { id: 7, question: "What is CloudFront?", options: ["A firewall service", "A content delivery network (CDN)", "A monitoring tool", "A database service"], correctAnswer: 1, explanation: "Amazon CloudFront is a fast content delivery network (CDN) service for delivering data and applications globally." },
      { id: 8, question: "What is the AWS Shared Responsibility Model?", options: ["Cost sharing between teams", "Security responsibilities divided between AWS and customer", "Data sharing policy", "Resource allocation model"], correctAnswer: 1, explanation: "The Shared Responsibility Model defines what AWS is responsible for (security of the cloud) vs what customers are responsible for (security in the cloud)." },
      { id: 9, question: "What is an Availability Zone?", options: ["A time zone", "An isolated location within an AWS region", "A pricing tier", "A security group"], correctAnswer: 1, explanation: "An Availability Zone is one or more isolated data centers within an AWS region with independent power and networking." },
      { id: 10, question: "What is Elastic Load Balancing?", options: ["A storage feature", "A service that distributes incoming traffic", "A pricing model", "A backup service"], correctAnswer: 1, explanation: "Elastic Load Balancing automatically distributes incoming application traffic across multiple targets." },
    ],
  };

  // Default/generic questions for unknown topics
  const genericQuestions: Question[] = [
    { id: 1, question: `What is the primary purpose of ${topic}?`, options: ["To solve complex problems", "To improve efficiency", "To enable new capabilities", "All of the above"], correctAnswer: 3, explanation: `${topic} is designed to address multiple needs including problem-solving, efficiency, and enabling new capabilities.` },
    { id: 2, question: `Which of the following best describes ${topic}?`, options: ["A methodology", "A technology", "A framework", "It depends on the context"], correctAnswer: 3, explanation: `The nature of ${topic} can vary based on how it's applied and in what context.` },
    { id: 3, question: `What is a key benefit of using ${topic}?`, options: ["Increased productivity", "Better organization", "Improved outcomes", "All of the above"], correctAnswer: 3, explanation: `${topic} typically provides multiple benefits including productivity, organization, and improved outcomes.` },
    { id: 4, question: `When should you consider using ${topic}?`, options: ["When facing complex challenges", "When scaling operations", "When optimizing processes", "All of the above"], correctAnswer: 3, explanation: `${topic} is valuable in various scenarios including complex challenges, scaling, and optimization.` },
    { id: 5, question: `What is a common challenge when implementing ${topic}?`, options: ["Learning curve", "Resource requirements", "Integration complexity", "All of the above"], correctAnswer: 3, explanation: `Implementing ${topic} often involves multiple challenges that need to be addressed.` },
    { id: 6, question: `Which skill is most important for ${topic}?`, options: ["Technical knowledge", "Problem-solving", "Communication", "Adaptability"], correctAnswer: 1, explanation: `While all skills are valuable, problem-solving is fundamental to working with ${topic}.` },
    { id: 7, question: `What is the future outlook for ${topic}?`, options: ["Declining relevance", "Stable adoption", "Growing importance", "Uncertain"], correctAnswer: 2, explanation: `Most emerging technologies and methodologies show growing importance in their respective fields.` },
    { id: 8, question: `How can you measure success with ${topic}?`, options: ["Performance metrics", "User satisfaction", "Business outcomes", "All of the above"], correctAnswer: 3, explanation: `Success with ${topic} should be measured using multiple metrics and indicators.` },
    { id: 9, question: `What is the first step in learning ${topic}?`, options: ["Understanding fundamentals", "Building projects", "Reading documentation", "Joining communities"], correctAnswer: 0, explanation: `Understanding the fundamentals is typically the first and most important step in learning any new topic.` },
    { id: 10, question: `Which industry benefits most from ${topic}?`, options: ["Technology", "Healthcare", "Finance", "All industries can benefit"], correctAnswer: 3, explanation: `${topic} has applications across multiple industries, each benefiting in different ways.` },
  ];

  // Normalize topic for matching
  const normalizedTopic = topic.toLowerCase().trim();
  let questions = genericQuestions;

  // Check for topic matches
  if (normalizedTopic.includes("javascript") || normalizedTopic.includes("js")) {
    questions = questionTemplates.javascript;
  } else if (normalizedTopic.includes("react") || normalizedTopic.includes("reactjs")) {
    questions = questionTemplates.react;
  } else if (normalizedTopic.includes("python")) {
    questions = questionTemplates.python;
  } else if (normalizedTopic.includes("aws") || normalizedTopic.includes("amazon")) {
    questions = questionTemplates.aws;
  }

  // Shuffle and take the requested count
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length)).map((q, idx) => ({ ...q, id: idx + 1 }));
};

const AIQuizGenerator = () => {
  const [quizState, setQuizState] = useState<QuizState>("setup");
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState("5");
  const [difficulty, setDifficulty] = useState("medium");
  const [timePerQuestion, setTimePerQuestion] = useState("60");
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; userAnswer: number; isCorrect: boolean }[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const [result, setResult] = useState<QuizResult | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer logic
  useEffect(() => {
    if (quizState === "quiz" && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
        setTotalTimeSpent((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizState, currentQuestionIndex]);

  const handleTimeUp = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    // Auto-submit with no answer
    if (selectedAnswer === null) {
      const newAnswers = [...answers, {
        questionId: questions[currentQuestionIndex].id,
        userAnswer: -1,
        isCorrect: false,
      }];
      setAnswers(newAnswers);
      
      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setShowExplanation(false);
          setTimeLeft(parseInt(timePerQuestion));
        }, 1000);
      } else {
        finishQuiz(newAnswers);
      }
    }
  }, [selectedAnswer, answers, currentQuestionIndex, questions, timePerQuestion]);

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) return;
    
    setQuizState("generating");
    
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const generatedQuestions = generateQuestionsForTopic(
      topic,
      parseInt(questionCount),
      difficulty
    );
    
    setQuestions(generatedQuestions);
    setTimeLeft(parseInt(timePerQuestion));
    setQuizState("quiz");
    
    // Animate entrance
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Already answered
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    const isCorrect = answerIndex === questions[currentQuestionIndex].correctAnswer;
    const newAnswers = [...answers, {
      questionId: questions[currentQuestionIndex].id,
      userAnswer: answerIndex,
      isCorrect,
    }];
    setAnswers(newAnswers);
    
    // Animate answer feedback
    gsap.to(`.option-${answerIndex}`, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(parseInt(timePerQuestion));
    } else {
      finishQuiz(answers);
    }
  };

  const finishQuiz = (finalAnswers: { questionId: number; userAnswer: number; isCorrect: boolean }[]) => {
    const correctCount = finalAnswers.filter((a) => a.isCorrect).length;
    setResult({
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      timeTaken: totalTimeSpent,
      answers: finalAnswers,
    });
    setQuizState("results");
  };

  const handleRestartQuiz = () => {
    setQuizState("setup");
    setTopic("");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setTimeLeft(0);
    setTotalTimeSpent(0);
    setShowExplanation(false);
    setResult(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 80) return "Excellent work! 🌟";
    if (percentage >= 70) return "Good job! 👍";
    if (percentage >= 60) return "Keep practicing! 💪";
    return "Don't give up! 📚";
  };

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto">
      {/* Setup State */}
      {quizState === "setup" && (
        <div className="glass-card rounded-2xl p-8 border border-primary/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              AI-Powered Quiz Generator
            </h2>
            <p className="text-muted-foreground">
              Enter any topic and let AI generate personalized quiz questions for you
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-foreground">
                Topic or Subject
              </Label>
              <div className="relative">
                <Input
                  id="topic"
                  placeholder="e.g., JavaScript, React, Python, AWS..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="pr-12 h-12 text-lg"
                />
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Number of Questions</Label>
                <Select value={questionCount} onValueChange={setQuestionCount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                    <SelectItem value="20">20 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Time per Question</Label>
                <Select value={timePerQuestion} onValueChange={setTimePerQuestion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">60 seconds</SelectItem>
                    <SelectItem value="90">90 seconds</SelectItem>
                    <SelectItem value="120">2 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerateQuiz}
              disabled={!topic.trim()}
              className="w-full h-12 text-lg group"
              size="lg"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Test My Brain! 🧠
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Popular topics: JavaScript, React, Python, AWS, Data Structures, Machine Learning
            </p>
          </div>
        </div>
      )}

      {/* Generating State */}
      {quizState === "generating" && (
        <div className="glass-card rounded-2xl p-12 text-center border border-primary/20">
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <div className="relative w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          </div>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            AI is generating your quiz...
          </h3>
          <p className="text-muted-foreground mb-4">
            Creating {questionCount} questions about "{topic}"
          </p>
          <div className="flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quiz State */}
      {quizState === "quiz" && questions.length > 0 && (
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="glass-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-sm">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </Badge>
                <span className="text-sm text-muted-foreground">{topic}</span>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                timeLeft <= 10 ? "bg-red-500/20 text-red-500" : "bg-primary/20 text-primary"
              }`}>
                <Timer className="w-4 h-4" />
                <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <Progress 
              value={(currentQuestionIndex / questions.length) * 100} 
              className="h-2" 
            />
          </div>

          {/* Question Card */}
          <div className="glass-card rounded-2xl p-8 border border-border">
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-8">
              {questions[currentQuestionIndex].question}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestionIndex].options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === questions[currentQuestionIndex].correctAnswer;
                const showResult = selectedAnswer !== null;

                let optionClass = "glass-card border-2 border-transparent hover:border-primary/30 cursor-pointer";
                
                if (showResult) {
                  if (isCorrect) {
                    optionClass = "bg-green-500/20 border-2 border-green-500";
                  } else if (isSelected && !isCorrect) {
                    optionClass = "bg-red-500/20 border-2 border-red-500";
                  } else {
                    optionClass = "opacity-50";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={`option-${index} w-full p-4 rounded-xl text-left transition-all duration-200 ${optionClass}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        showResult && isCorrect
                          ? "bg-green-500 text-white"
                          : showResult && isSelected && !isCorrect
                          ? "bg-red-500 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-foreground flex-1">{option}</span>
                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground mb-1">Explanation</p>
                    <p className="text-sm text-muted-foreground">
                      {questions[currentQuestionIndex].explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Button */}
            {selectedAnswer !== null && (
              <div className="mt-6 flex justify-end">
                <Button onClick={handleNextQuestion} size="lg" className="group">
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Bring It On! →
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      Show Me the Damage! 🏆
                      <Trophy className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results State */}
      {quizState === "results" && result && (
        <div className="glass-card rounded-2xl p-8 border border-primary/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Quiz Complete!
            </h2>
            <p className="text-muted-foreground">{getScoreMessage((result.correctAnswers / result.totalQuestions) * 100)}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="glass-card rounded-xl p-4 text-center">
              <div className={`font-display text-3xl font-bold ${getScoreColor((result.correctAnswers / result.totalQuestions) * 100)}`}>
                {Math.round((result.correctAnswers / result.totalQuestions) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">Score</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="font-display text-3xl font-bold text-foreground">
                {result.correctAnswers}/{result.totalQuestions}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Correct</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="font-display text-3xl font-bold text-foreground">
                {formatTime(result.timeTaken)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Time Taken</p>
            </div>
          </div>

          {/* Answer Summary */}
          <div className="mb-8">
            <h3 className="font-display font-semibold text-foreground mb-4">Question Summary</h3>
            <div className="space-y-2">
              {result.answers.map((answer, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    answer.isCorrect ? "bg-green-500/10" : "bg-red-500/10"
                  }`}
                >
                  {answer.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="text-sm text-foreground">
                    Question {index + 1}
                  </span>
                  <span className={`text-sm ml-auto ${answer.isCorrect ? "text-green-500" : "text-red-500"}`}>
                    {answer.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleRestartQuiz} variant="outline" className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Fresh Start! 🌟
            </Button>
            <Button onClick={() => {
              setQuizState("quiz");
              setCurrentQuestionIndex(0);
              setSelectedAnswer(null);
              setAnswers([]);
              setTimeLeft(parseInt(timePerQuestion));
              setTotalTimeSpent(0);
              setShowExplanation(false);
              setResult(null);
            }} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Redemption Arc! 🔄
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIQuizGenerator;
