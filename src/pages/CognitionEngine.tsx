import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  Target, 
  GitBranch, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Filter,
  Layers
} from 'lucide-react';

export default function CognitionEngine() {
  const [selectedPipeline, setSelectedPipeline] = useState('context');

  const contextParsingSteps = [
    { name: 'App Detection', description: 'Identify current application (Slack, Outlook, etc.)', confidence: 95 },
    { name: 'Content Analysis', description: 'Extract key entities and intent from user input', confidence: 88 },
    { name: 'Role Context', description: 'Determine user role and department permissions', confidence: 92 },
    { name: 'Temporal Context', description: 'Assess recency and urgency indicators', confidence: 85 },
    { name: 'Workflow State', description: 'Identify current process step or workflow stage', confidence: 78 }
  ];

  const intentClassificationTypes = [
    { type: 'Information Seeking', examples: ['How do I...', 'What is the process for...', 'Where can I find...'], confidence: 0.92 },
    { type: 'Task Execution', examples: ['I need to submit...', 'Help me complete...', 'Walk me through...'], confidence: 0.89 },
    { type: 'Access Request', examples: ['I need access to...', 'Can I get permission...', 'Who approves...'], confidence: 0.94 },
    { type: 'Policy Clarification', examples: ['Is it allowed to...', 'What are the rules...', 'Am I required to...'], confidence: 0.87 },
    { type: 'Troubleshooting', examples: ['This isn\'t working...', 'I\'m getting an error...', 'Something is broken...'], confidence: 0.85 }
  ];

  const confidenceThresholds = [
    { level: 'High Confidence', range: '0.85 - 1.0', action: 'Surface immediately with full content', color: 'green' },
    { level: 'Medium Confidence', range: '0.65 - 0.84', action: 'Surface with confidence indicator', color: 'yellow' },
    { level: 'Low Confidence', range: '0.45 - 0.64', action: 'Suggest related memories', color: 'orange' },
    { level: 'No Confidence', range: '0.0 - 0.44', action: 'Do not surface, log for learning', color: 'red' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-slate-900">Cognition Engine Logic</h1>
        </div>
        <p className="text-lg text-slate-600">
          Core logic engine that governs when and how knowledge is contextually surfaced to users
        </p>
      </div>

      <Tabs defaultValue="pipeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pipeline">Processing Pipeline</TabsTrigger>
          <TabsTrigger value="disambiguation">Disambiguation</TabsTrigger>
          <TabsTrigger value="feedback">Feedback Loop</TabsTrigger>
          <TabsTrigger value="guardrails">Guardrails</TabsTrigger>
          <TabsTrigger value="stitching">Multi-Memory</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <Card className={`cursor-pointer transition-all ${selectedPipeline === 'context' ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`} 
                  onClick={() => setSelectedPipeline('context')}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span>Context Parsing</span>
                </CardTitle>
                <CardDescription className="text-sm">Extract app, role, and temporal context</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{contextParsingSteps.length}</div>
                <div className="text-sm text-slate-600">Processing Steps</div>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer transition-all ${selectedPipeline === 'intent' ? 'ring-2 ring-green-500' : 'hover:shadow-lg'}`} 
                  onClick={() => setSelectedPipeline('intent')}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Zap className="h-4 w-4 text-green-600" />
                  <span>Intent Classification</span>
                </CardTitle>
                <CardDescription className="text-sm">Classify user intent and query type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{intentClassificationTypes.length}</div>
                <div className="text-sm text-slate-600">Intent Types</div>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer transition-all ${selectedPipeline === 'confidence' ? 'ring-2 ring-purple-500' : 'hover:shadow-lg'}`} 
                  onClick={() => setSelectedPipeline('confidence')}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Filter className="h-4 w-4 text-purple-600" />
                  <span>Confidence Thresholding</span>
                </CardTitle>
                <CardDescription className="text-sm">Determine when to surface knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{confidenceThresholds.length}</div>
                <div className="text-sm text-slate-600">Threshold Levels</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              {selectedPipeline === 'context' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900">Context Parsing Pipeline</h3>
                  <div className="space-y-4">
                    {contextParsingSteps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{step.name}</h4>
                          <p className="text-sm text-slate-600">{step.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-slate-900">{step.confidence}%</div>
                          <Progress value={step.confidence} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedPipeline === 'intent' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900">Intent Classification Types</h3>
                  <div className="space-y-4">
                    {intentClassificationTypes.map((intent, index) => (
                      <div key={index} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-slate-900">{intent.type}</h4>
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {(intent.confidence * 100).toFixed(0)}% accuracy
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-slate-600 font-medium">Example patterns:</p>
                          <div className="flex flex-wrap gap-2">
                            {intent.examples.map((example, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                "{example}"
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedPipeline === 'confidence' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900">Confidence Thresholding Logic</h3>
                  <div className="space-y-4">
                    {confidenceThresholds.map((threshold, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg">
                        <div className={`w-4 h-4 rounded-full bg-${threshold.color}-500`}></div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-slate-900">{threshold.level}</h4>
                            <Badge variant="outline" className="text-xs">{threshold.range}</Badge>
                          </div>
                          <p className="text-sm text-slate-600">{threshold.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disambiguation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitBranch className="h-5 w-5 text-indigo-600" />
                <span>Memory Disambiguation Logic</span>
              </CardTitle>
              <CardDescription>
                How the system handles multiple candidate matches for a single query
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Disambiguation Strategies</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <h5 className="font-medium text-slate-900">Contextual Ranking</h5>
                          <p className="text-sm text-slate-600">Rank memories by relevance to current app and user context</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <h5 className="font-medium text-slate-900">Departmental Preference</h5>
                          <p className="text-sm text-slate-600">Prioritize memories from user's department or related teams</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <h5 className="font-medium text-slate-900">Recency Weighting</h5>
                          <p className="text-sm text-slate-600">Favor recently updated or frequently accessed memories</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <div>
                          <h5 className="font-medium text-slate-900">Authority Scoring</h5>
                          <p className="text-sm text-slate-600">Weight by approver seniority and source confidence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Disambiguation Flow</h4>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center font-semibold">1</div>
                          <span className="text-sm">Semantic similarity search</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 ml-3" />
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center font-semibold">2</div>
                          <span className="text-sm">Apply contextual filters</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 ml-3" />
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center font-semibold">3</div>
                          <span className="text-sm">Score and rank candidates</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 ml-3" />
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full text-xs flex items-center justify-center font-semibold">4</div>
                          <span className="text-sm">Surface top result or cluster</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Example Disambiguation Scenario</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 mb-3">
                      <strong>Query:</strong> "How do I get budget approval?"
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">IT Budget Approval Process</span>
                        <Badge variant="outline" className="text-blue-600 border-blue-200">Score: 0.89</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">Marketing Campaign Budget</span>
                        <Badge variant="outline" className="text-blue-600 border-blue-200">Score: 0.76</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">General Expense Approval</span>
                        <Badge variant="outline" className="text-blue-600 border-blue-200">Score: 0.82</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-blue-600 mt-3">
                      → Surfaces IT Budget process (highest score + user's IT department context)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Feedback Loop System</span>
              </CardTitle>
              <CardDescription>
                How user interactions improve the cognition engine over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">User Feedback Types</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">Accepted</span>
                      </div>
                      <p className="text-sm text-green-700">User clicked and used the surfaced memory</p>
                      <p className="text-xs text-green-600 mt-1">→ Increases confidence for similar contexts</p>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Ignored</span>
                      </div>
                      <p className="text-sm text-yellow-700">Memory surfaced but user didn't interact</p>
                      <p className="text-xs text-yellow-600 mt-1">→ Slight confidence decrease, context analysis</p>
                    </div>
                    
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-red-800">Rejected</span>
                      </div>
                      <p className="text-sm text-red-700">User explicitly marked as "not helpful"</p>
                      <p className="text-xs text-red-600 mt-1">→ Strong negative signal, pattern analysis</p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Edited</span>
                      </div>
                      <p className="text-sm text-blue-700">User modified the surfaced content</p>
                      <p className="text-xs text-blue-600 mt-1">→ Creates new memory variant, improves accuracy</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Learning Mechanisms</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-medium text-slate-900">Embedding Refinement</h5>
                        <p className="text-sm text-slate-600">Positive feedback strengthens semantic associations</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-medium text-slate-900">Context Pattern Learning</h5>
                        <p className="text-sm text-slate-600">Identifies which contexts lead to successful surfacing</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-medium text-slate-900">Threshold Adjustment</h5>
                        <p className="text-sm text-slate-600">Dynamically adjusts confidence thresholds per user/dept</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-medium text-slate-900">Variant Generation</h5>
                        <p className="text-sm text-slate-600">Creates new semantic variants from successful queries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guardrails" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>Safety Guardrails</span>
              </CardTitle>
              <CardDescription>
                Preventing hallucination and ensuring memory freshness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Hallucination Prevention</h4>
                  <div className="space-y-3">
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-2">Source Grounding</h5>
                      <p className="text-sm text-slate-600">Every surfaced memory must reference authoritative source</p>
                      <Badge variant="outline" className="mt-2 text-xs">Required</Badge>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-2">Confidence Floors</h5>
                      <p className="text-sm text-slate-600">Minimum 0.45 similarity score required for any surfacing</p>
                      <Badge variant="outline" className="mt-2 text-xs">Threshold</Badge>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-2">Human Validation</h5>
                      <p className="text-sm text-slate-600">All memories require SME approval before first surfacing</p>
                      <Badge variant="outline" className="mt-2 text-xs">Mandatory</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Staleness Detection</h4>
                  <div className="space-y-3">
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-2">Expiration Policies</h5>
                      <p className="text-sm text-slate-600">Time-based and event-based expiration rules</p>
                      <Badge variant="outline" className="mt-2 text-xs">Automated</Badge>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-2">Source Monitoring</h5>
                      <p className="text-sm text-slate-600">Track changes to source documents and systems</p>
                      <Badge variant="outline" className="mt-2 text-xs">Real-time</Badge>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-2">Usage Decay</h5>
                      <p className="text-sm text-slate-600">Reduce confidence for memories with declining usage</p>
                      <Badge variant="outline" className="mt-2 text-xs">Adaptive</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stitching" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="h-5 w-5 text-indigo-600" />
                <span>Multi-Memory Stitching</span>
              </CardTitle>
              <CardDescription>
                Resolving complex multi-step questions by combining multiple memories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Example: "How do I get budget approved for a vendor tool?"</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center font-semibold">1</div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-blue-800">Vendor Approval Process</span>
                        <p className="text-xs text-blue-600">Memory: mem_proc_001</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center font-semibold">2</div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-green-800">Budget Approval Workflow</span>
                        <p className="text-xs text-green-600">Memory: mem_fin_003</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center font-semibold">3</div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-purple-800">Tool Evaluation Criteria</span>
                        <p className="text-xs text-purple-600">Memory: mem_it_007</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Stitching Algorithm</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <h5 className="font-medium text-slate-900">Dependency Detection</h5>
                          <p className="text-sm text-slate-600">Identify related workflows and process dependencies</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <h5 className="font-medium text-slate-900">Sequence Ordering</h5>
                          <p className="text-sm text-slate-600">Arrange memories in logical execution order</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <h5 className="font-medium text-slate-900">Context Bridging</h5>
                          <p className="text-sm text-slate-600">Generate connecting text between memory segments</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <div>
                          <h5 className="font-medium text-slate-900">Coherence Validation</h5>
                          <p className="text-sm text-slate-600">Ensure stitched response makes logical sense</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Stitching Constraints</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h5 className="font-medium text-yellow-800">Maximum Memories</h5>
                        <p className="text-sm text-yellow-700">Limit to 5 memories per stitched response</p>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h5 className="font-medium text-blue-800">Permission Intersection</h5>
                        <p className="text-sm text-blue-700">User must have access to all component memories</p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h5 className="font-medium text-green-800">Freshness Requirement</h5>
                        <p className="text-sm text-green-700">All memories must be within expiration policy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}