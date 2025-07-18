import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  MessageSquare, 
  Mail, 
  Chrome,
  Brain,
  Zap,
  CheckCircle,
  Clock,
  User,
  Building,
  ArrowRight,
  Sparkles,
  Target,
  Eye
} from 'lucide-react';

interface DemoScenario {
  id: string;
  title: string;
  description: string;
  platform: 'slack' | 'email' | 'form';
  userInput: string;
  context: string;
  expectedMemory: {
    question: string;
    answer: string;
    confidence: number;
    source: string;
    department: string;
  };
}

interface SimulationStep {
  step: number;
  name: string;
  description: string;
  duration: number;
  status: 'pending' | 'processing' | 'complete';
}

export default function InteractiveDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>('vendor-approval');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [showResult, setShowResult] = useState(false);

  const demoScenarios: DemoScenario[] = [
    {
      id: 'vendor-approval',
      title: 'Vendor Approval Process',
      description: 'User asking about vendor onboarding in Slack',
      platform: 'slack',
      userInput: 'Hey team, how do I get approval for a new vendor?',
      context: 'Slack #procurement channel, user: john.doe@company.com, role: Product Manager',
      expectedMemory: {
        question: 'How do I get approval for a new vendor?',
        answer: 'Submit a vendor onboarding request through the procurement portal. Legal and privacy reviews are required before IT provisioning.',
        confidence: 0.92,
        source: 'Procurement Policy v2.1',
        department: 'Procurement'
      }
    },
    {
      id: 'budget-approval',
      title: 'Budget Approval Workflow',
      description: 'Email composition about budget requests',
      platform: 'email',
      userInput: 'I need to request budget approval for Q2 marketing campaigns...',
      context: 'Outlook compose window, recipient: finance@company.com, user: sarah.chen@company.com',
      expectedMemory: {
        question: 'What is the budget approval process?',
        answer: 'Budget requests over $10K require department head approval, followed by finance review. Use the budget request form in SharePoint.',
        confidence: 0.89,
        source: 'Finance Procedures Manual',
        department: 'Finance'
      }
    },
    {
      id: 'security-incident',
      title: 'Security Incident Response',
      description: 'IT form completion for incident reporting',
      platform: 'form',
      userInput: 'Reporting potential security incident - suspicious email received',
      context: 'IT Service Portal incident form, user: mike.wilson@company.com, role: Senior Developer',
      expectedMemory: {
        question: 'How do I report a security incident?',
        answer: 'Immediately isolate affected systems, contact security team at ext. 911, and document all details in the incident form.',
        confidence: 0.95,
        source: 'Security Response Playbook',
        department: 'Security'
      }
    }
  ];

  const simulationSteps: SimulationStep[] = [
    { step: 1, name: 'Context Analysis', description: 'Analyzing user context and platform', duration: 800, status: 'pending' },
    { step: 2, name: 'Intent Classification', description: 'Determining user intent and query type', duration: 1200, status: 'pending' },
    { step: 3, name: 'Semantic Search', description: 'Searching memory store for relevant knowledge', duration: 600, status: 'pending' },
    { step: 4, name: 'Permission Check', description: 'Validating user access to candidate memories', duration: 400, status: 'pending' },
    { step: 5, name: 'Confidence Scoring', description: 'Calculating relevance and confidence scores', duration: 700, status: 'pending' },
    { step: 6, name: 'Memory Surfacing', description: 'Delivering contextual knowledge to user', duration: 300, status: 'pending' }
  ];

  const [steps, setSteps] = useState(simulationSteps);

  const runSimulation = async () => {
    setIsSimulating(true);
    setShowResult(false);
    setCurrentStep(0);
    setSimulationProgress(0);
    
    // Reset all steps
    setSteps(simulationSteps.map(step => ({ ...step, status: 'pending' })));

    for (let i = 0; i < steps.length; i++) {
      // Mark current step as processing
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index === i ? 'processing' : index < i ? 'complete' : 'pending'
      })));
      
      setCurrentStep(i);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      
      // Update progress
      setSimulationProgress(((i + 1) / steps.length) * 100);
    }

    // Mark all steps as complete
    setSteps(prev => prev.map(step => ({ ...step, status: 'complete' })));
    setShowResult(true);
    setIsSimulating(false);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setCurrentStep(0);
    setSimulationProgress(0);
    setShowResult(false);
    setSteps(simulationSteps.map(step => ({ ...step, status: 'pending' })));
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'slack': return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'email': return <Mail className="h-4 w-4 text-blue-500" />;
      case 'form': return <Chrome className="h-4 w-4 text-green-500" />;
      default: return <Chrome className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing': return <Zap className="h-4 w-4 text-blue-500 animate-pulse" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const selectedScenarioData = demoScenarios.find(s => s.id === selectedScenario);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-slate-900">Interactive Olis Demo</h1>
        </div>
        <p className="text-lg text-slate-600">
          Experience how Olis contextually surfaces knowledge in real enterprise scenarios
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Scenario Selection */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Demo Scenarios</CardTitle>
              <CardDescription>Choose a realistic enterprise use case</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoScenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedScenario === scenario.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setSelectedScenario(scenario.id)}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {getPlatformIcon(scenario.platform)}
                    <span className="font-medium text-slate-900 text-sm">{scenario.title}</span>
                  </div>
                  <p className="text-xs text-slate-600">{scenario.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Custom Input</CardTitle>
              <CardDescription>Try your own query</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your question or scenario..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="mb-3"
              />
              <Button variant="outline" size="sm" className="w-full">
                <Brain className="h-4 w-4 mr-2" />
                Analyze Custom Input
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Simulation Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Scenario */}
          {selectedScenarioData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getPlatformIcon(selectedScenarioData.platform)}
                  <span>{selectedScenarioData.title}</span>
                </CardTitle>
                <CardDescription>{selectedScenarioData.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h5 className="font-medium text-slate-900 mb-2">User Input</h5>
                    <p className="text-sm text-slate-700 italic">"{selectedScenarioData.userInput}"</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">Context</h5>
                    <p className="text-sm text-blue-700">{selectedScenarioData.context}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button 
                      onClick={runSimulation} 
                      disabled={isSimulating}
                      className="flex-1"
                    >
                      {isSimulating ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Run Simulation
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={resetSimulation}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Processing Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Cognition Engine Processing</span>
                <div className="text-sm text-slate-500">
                  {simulationProgress.toFixed(0)}% Complete
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={simulationProgress} className="w-full" />
                
                <div className="space-y-3">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      {getStepIcon(step.status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-slate-900 text-sm">{step.name}</span>
                          {step.status === 'processing' && (
                            <Badge variant="secondary" className="text-xs">Processing</Badge>
                          )}
                          {step.status === 'complete' && (
                            <Badge variant="default" className="text-xs bg-green-600">Complete</Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-600">{step.description}</p>
                      </div>
                      {step.status === 'processing' && (
                        <div className="w-16">
                          <Progress value={75} className="h-1" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {showResult && selectedScenarioData && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <Target className="h-5 w-5" />
                  <span>Memory Surfaced Successfully</span>
                </CardTitle>
                <CardDescription className="text-green-700">
                  Olis found and surfaced relevant knowledge based on the user's context
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-slate-900">
                        {selectedScenarioData.expectedMemory.question}
                      </h5>
                      <Badge variant="default" className="bg-green-600">
                        {(selectedScenarioData.expectedMemory.confidence * 100).toFixed(0)}% confidence
                      </Badge>
                    </div>
                    
                    <p className="text-slate-700 mb-4">
                      {selectedScenarioData.expectedMemory.answer}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600">Department: {selectedScenarioData.expectedMemory.department}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600">Source: {selectedScenarioData.expectedMemory.source}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h5 className="font-semibold text-slate-900 mb-3">Surfacing Method</h5>
                    <div className="flex items-center space-x-3">
                      {getPlatformIcon(selectedScenarioData.platform)}
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-600">
                        {selectedScenarioData.platform === 'slack' && 'Inline suggestion with "See more" link'}
                        {selectedScenarioData.platform === 'email' && 'Outlook sidebar with contextual help'}
                        {selectedScenarioData.platform === 'form' && 'Field tooltip with relevant guidance'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h5 className="font-semibold text-slate-900 mb-3">Performance Metrics</h5>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-green-600">87ms</div>
                        <div className="text-xs text-slate-600">Response Time</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">3</div>
                        <div className="text-xs text-slate-600">Memories Evaluated</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">1</div>
                        <div className="text-xs text-slate-600">Memory Surfaced</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}