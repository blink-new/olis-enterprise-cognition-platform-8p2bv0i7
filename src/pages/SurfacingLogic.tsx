import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Zap, 
  Eye, 
  MessageSquare, 
  Mail, 
  FileText, 
  Settings,
  Target,
  MousePointer,
  Bell,
  X,
  ThumbsUp,
  ThumbsDown,
  Edit
} from 'lucide-react';

export default function SurfacingLogic() {
  const [relevanceThreshold, setRelevanceThreshold] = useState([75]);
  const [selectedContext, setSelectedContext] = useState('slack');

  const contextualTriggers = [
    {
      context: 'slack',
      name: 'Slack Messaging',
      icon: MessageSquare,
      triggers: [
        'User typing question in channel',
        'Keywords match memory patterns',
        'Thread context indicates need for guidance',
        'User mentions specific processes or policies'
      ],
      surfacingMethods: ['Inline suggestion', 'Thread reply', 'DM from bot'],
      threshold: 0.7
    },
    {
      context: 'email',
      name: 'Email Drafting',
      icon: Mail,
      triggers: [
        'Composing email with policy-related content',
        'Recipient suggests formal process needed',
        'Subject line indicates approval request',
        'Email contains procedural questions'
      ],
      surfacingMethods: ['Sidebar suggestion', 'Inline ghost text', 'Draft enhancement'],
      threshold: 0.8
    },
    {
      context: 'forms',
      name: 'Form Filling',
      icon: FileText,
      triggers: [
        'User accessing procurement forms',
        'Budget approval workflows initiated',
        'Compliance forms being completed',
        'Vendor evaluation in progress'
      ],
      surfacingMethods: ['Contextual tooltip', 'Help panel', 'Auto-complete suggestions'],
      threshold: 0.85
    },
    {
      context: 'browser',
      name: 'Web Browsing',
      icon: Eye,
      triggers: [
        'Visiting internal policy pages',
        'Accessing vendor websites',
        'Reading compliance documentation',
        'Researching process requirements'
      ],
      surfacingMethods: ['Browser extension overlay', 'Floating widget', 'Page annotation'],
      threshold: 0.6
    }
  ];

  const injectionTypes = [
    {
      type: 'passive',
      name: 'Passive Ghost Text',
      description: 'Subtle gray text that appears as user types, similar to autocomplete',
      useCase: 'Email drafting, document writing',
      intrusiveness: 'Low',
      accuracy: 'High',
      example: 'As you type "vendor approval", ghost text suggests "process requires legal review first"'
    },
    {
      type: 'hover',
      name: 'Hover Popup',
      description: 'Information appears when user hovers over relevant keywords or phrases',
      useCase: 'Reading documents, reviewing policies',
      intrusiveness: 'Medium',
      accuracy: 'Very High',
      example: 'Hovering over "budget threshold" shows popup with current approval limits'
    },
    {
      type: 'inline',
      name: 'Inline Dropdown',
      description: 'Expandable suggestions that appear directly in the content flow',
      useCase: 'Form filling, structured data entry',
      intrusiveness: 'Medium',
      accuracy: 'High',
      example: 'Dropdown appears below form field with relevant policy guidance'
    },
    {
      type: 'sidebar',
      name: 'Contextual Sidebar',
      description: 'Dedicated panel that shows relevant memories based on current activity',
      useCase: 'Complex workflows, research tasks',
      intrusiveness: 'High',
      accuracy: 'Very High',
      example: 'Sidebar shows step-by-step vendor approval process while filling forms'
    }
  ];

  const userOverrides = [
    {
      action: 'dismiss',
      name: 'Dismiss This Memory',
      description: 'Hide this specific memory for current context',
      impact: 'Temporary - memory may resurface in different contexts',
      icon: X
    },
    {
      action: 'never_show',
      name: 'Never Show This Again',
      description: 'Permanently hide this memory for this user',
      impact: 'Permanent - memory will not surface for this user',
      icon: ThumbsDown
    },
    {
      action: 'mark_helpful',
      name: 'Mark as Helpful',
      description: 'Positive feedback increases surfacing likelihood',
      impact: 'Increases confidence score for similar contexts',
      icon: ThumbsUp
    },
    {
      action: 'suggest_edit',
      name: 'Suggest Improvement',
      description: 'Provide feedback to improve memory accuracy',
      impact: 'Creates improvement task for memory owner',
      icon: Edit
    },
    {
      action: 'adjust_threshold',
      name: 'Adjust Sensitivity',
      description: 'Change how often memories surface for this user',
      impact: 'Personalizes surfacing frequency preferences',
      icon: Settings
    }
  ];

  const surfacingExamples = [
    {
      scenario: 'Slack: Vendor Question',
      context: 'User asks "How do I add a new vendor?" in #procurement channel',
      trigger: 'Keyword match + channel context',
      confidence: 0.92,
      surfacing: 'Inline thread reply with vendor approval process',
      userAction: 'Clicked and followed process',
      outcome: 'Successful - memory marked helpful'
    },
    {
      scenario: 'Email: Budget Request',
      context: 'Drafting email to manager about software purchase',
      trigger: 'Email content analysis + recipient role',
      confidence: 0.87,
      surfacing: 'Sidebar suggestion with budget approval workflow',
      userAction: 'Used suggested template',
      outcome: 'Successful - process completed faster'
    },
    {
      scenario: 'Form: Expense Report',
      context: 'Filling out expense report for conference attendance',
      trigger: 'Form field analysis + expense category',
      confidence: 0.94,
      surfacing: 'Tooltip with receipt requirements',
      userAction: 'Followed guidance',
      outcome: 'Successful - report approved first time'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="h-8 w-8 text-yellow-600" />
          <h1 className="text-3xl font-bold text-slate-900">UX-Triggered Surfacing Logic</h1>
        </div>
        <p className="text-lg text-slate-600">
          Grammarly-like contextual knowledge surfacing that intelligently decides where, when, and how to present information
        </p>
      </div>

      <Tabs defaultValue="triggers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="triggers">Contextual Triggers</TabsTrigger>
          <TabsTrigger value="injection">Injection Types</TabsTrigger>
          <TabsTrigger value="thresholds">Relevance Thresholds</TabsTrigger>
          <TabsTrigger value="overrides">User Overrides</TabsTrigger>
          <TabsTrigger value="examples">Real Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="triggers" className="space-y-6">
          <div className="grid lg:grid-cols-4 gap-4 mb-6">
            {contextualTriggers.map((trigger) => {
              const Icon = trigger.icon;
              return (
                <Card 
                  key={trigger.context}
                  className={`cursor-pointer transition-all ${selectedContext === trigger.context ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
                  onClick={() => setSelectedContext(trigger.context)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-blue-600" />
                      <span>{trigger.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-xs text-slate-600">Confidence Threshold</div>
                      <Badge variant="outline" className="text-xs">
                        {(trigger.threshold * 100).toFixed(0)}%
                      </Badge>
                      <div className="text-xs text-slate-600 mt-2">{trigger.triggers.length} trigger types</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>Context Details: {contextualTriggers.find(t => t.context === selectedContext)?.name}</span>
              </CardTitle>
              <CardDescription>
                Specific triggers and surfacing methods for this context
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const context = contextualTriggers.find(t => t.context === selectedContext);
                return context ? (
                  <div className="space-y-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900">Trigger Conditions</h4>
                        <div className="space-y-2">
                          {context.triggers.map((trigger, index) => (
                            <div key={index} className="flex items-start space-x-2 p-2 bg-slate-50 rounded">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              <span className="text-sm text-slate-700">{trigger}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900">Surfacing Methods</h4>
                        <div className="space-y-2">
                          {context.surfacingMethods.map((method, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                              <span className="text-sm text-green-800">{method}</span>
                              <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                                Available
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-slate-900 mb-4">Context-Specific Logic</h4>
                      <div className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs">
                        <pre>{`// ${context.name} Surfacing Logic
function shouldSurface${context.context.charAt(0).toUpperCase() + context.context.slice(1)}Memory(context, memory) {
  // 1. Context analysis
  const contextScore = analyzeContext(context);
  if (contextScore < ${context.threshold}) return false;
  
  // 2. Memory relevance
  const relevanceScore = calculateRelevance(
    context.content, 
    memory.embeddings
  );
  
  // 3. User preferences
  const userPrefs = getUserPreferences(context.userId);
  const adjustedThreshold = userPrefs.surfacingThreshold || ${context.threshold};
  
  // 4. Timing considerations
  const timingScore = evaluateTiming(context.activity);
  
  // 5. Final decision
  const finalScore = (relevanceScore * 0.6) + 
                    (contextScore * 0.3) + 
                    (timingScore * 0.1);
                    
  return finalScore >= adjustedThreshold;
}`}</pre>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="injection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MousePointer className="h-5 w-5 text-purple-600" />
                <span>Knowledge Injection Methods</span>
              </CardTitle>
              <CardDescription>
                Different ways to surface memories based on context and user preference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {injectionTypes.map((injection, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-900">{injection.name}</h4>
                        <Badge variant={
                          injection.intrusiveness === 'Low' ? 'secondary' :
                          injection.intrusiveness === 'Medium' ? 'default' : 'destructive'
                        } className="text-xs">
                          {injection.intrusiveness} Intrusion
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{injection.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Best for:</span>
                          <span className="font-medium">{injection.useCase}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Accuracy:</span>
                          <Badge variant="outline" className="text-xs">{injection.accuracy}</Badge>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-800">
                        <strong>Example:</strong> {injection.example}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Injection Decision Matrix</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="border border-slate-300 px-4 py-2 text-left font-semibold">Context</th>
                          <th className="border border-slate-300 px-4 py-2 text-left font-semibold">High Confidence</th>
                          <th className="border border-slate-300 px-4 py-2 text-left font-semibold">Medium Confidence</th>
                          <th className="border border-slate-300 px-4 py-2 text-left font-semibold">Low Confidence</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-slate-300 px-4 py-2 font-medium">Slack Messaging</td>
                          <td className="border border-slate-300 px-4 py-2 text-sm">Inline suggestion</td>
                          <td className="border border-slate-300 px-4 py-2 text-sm">Hover popup</td>
                          <td className="border border-slate-300 px-4 py-2 text-sm">No surfacing</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 px-4 py-2 font-medium">Email Drafting</td>
                          <td className="border border-slate-300 px-4 py-2 text-sm">Ghost text</td>
                          <td className="border border-slate-300 px-4 py-2 text-sm">Sidebar suggestion</td>
                          <td className="border border-slate-300 px-4 py-2 text-sm">Subtle highlight</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 px-4 py-2 font-medium">Form Filling</td>
                          <td className="border border-slate-300 px-4 py-2 text-sm">Inline dropdown</td>
                          <td className="border border-slate-300 px-4 py-2 text-sm">Contextual tooltip</td>
                          <td className="border border-slate-300 px-4 py-2 text-sm">Help icon</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 px-4 py-2 font-medium">Web Browsing</td>
                          <td className="border border-slate-300 px-4 py-2 text-sm">Page overlay</td>
                          <td className="border border-slate-300 px-4 py-2 text-sm">Floating widget</td>
                          <td className="border border-slate-300 px-4 py-2 text-sm">Browser badge</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thresholds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-blue-600" />
                <span>Dynamic Relevance Thresholds</span>
              </CardTitle>
              <CardDescription>
                Adaptive confidence scoring that determines when to surface knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Global Threshold Control</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium">Relevance Threshold</label>
                          <span className="text-sm text-slate-600">{relevanceThreshold[0]}%</span>
                        </div>
                        <Slider
                          value={relevanceThreshold}
                          onValueChange={setRelevanceThreshold}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>More Suggestions</span>
                          <span>Fewer, Higher Quality</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h5 className="font-medium text-blue-800 mb-2">Current Setting Impact</h5>
                        <p className="text-sm text-blue-700">
                          At {relevanceThreshold[0]}% threshold, you'll see approximately{' '}
                          {relevanceThreshold[0] < 50 ? '15-20' : 
                           relevanceThreshold[0] < 75 ? '8-12' : '3-5'} suggestions per day
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Context-Specific Thresholds</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <span className="font-medium text-slate-900">Critical Processes</span>
                          <p className="text-xs text-slate-600">Security, legal, compliance</p>
                        </div>
                        <Badge variant="destructive" className="text-xs">45% threshold</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <span className="font-medium text-slate-900">Standard Operations</span>
                          <p className="text-xs text-slate-600">HR, procurement, general policies</p>
                        </div>
                        <Badge variant="default" className="text-xs">65% threshold</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <span className="font-medium text-slate-900">Optional Guidance</span>
                          <p className="text-xs text-slate-600">Best practices, tips, suggestions</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">85% threshold</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Adaptive Threshold Logic</h4>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs">
                    <pre>{`// Dynamic Threshold Calculation
function calculateSurfacingThreshold(context, user, memory) {
  let baseThreshold = 0.65; // Default 65%
  
  // 1. Memory criticality adjustment
  if (memory.tags.includes('security') || memory.tags.includes('legal')) {
    baseThreshold -= 0.20; // Lower threshold for critical info
  }
  
  // 2. User experience adjustment
  const userExperience = getUserExperienceLevel(user, memory.department);
  if (userExperience === 'junior') {
    baseThreshold -= 0.15; // More help for junior users
  }
  
  // 3. Context urgency adjustment
  if (context.urgency === 'high') {
    baseThreshold -= 0.10; // Lower threshold for urgent contexts
  }
  
  // 4. Historical success rate adjustment
  const successRate = getMemorySuccessRate(memory.id, user.id);
  if (successRate > 0.8) {
    baseThreshold -= 0.05; // Lower threshold for proven helpful memories
  }
  
  // 5. User preference adjustment
  baseThreshold += user.preferences.surfacingAggression || 0;
  
  return Math.max(0.3, Math.min(0.9, baseThreshold));
}`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overrides" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-orange-600" />
                <span>User Override Controls</span>
              </CardTitle>
              <CardDescription>
                Comprehensive user controls for managing memory surfacing behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Available User Actions</h4>
                    <div className="space-y-3">
                      {userOverrides.map((override, index) => {
                        const Icon = override.icon;
                        return (
                          <div key={index} className="p-3 border border-slate-200 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Icon className="h-4 w-4 text-slate-600" />
                              <h5 className="font-medium text-slate-900">{override.name}</h5>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{override.description}</p>
                            <div className="text-xs text-slate-500">
                              <strong>Impact:</strong> {override.impact}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Feedback Learning Loop</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h5 className="font-medium text-green-800 mb-2">Positive Feedback</h5>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Increases memory confidence score</li>
                          <li>• Improves similar context matching</li>
                          <li>• Strengthens semantic associations</li>
                          <li>• Reduces surfacing threshold for user</li>
                        </ul>
                      </div>

                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <h5 className="font-medium text-red-800 mb-2">Negative Feedback</h5>
                        <ul className="text-sm text-red-700 space-y-1">
                          <li>• Decreases memory confidence score</li>
                          <li>• Analyzes context mismatch patterns</li>
                          <li>• Adjusts semantic understanding</li>
                          <li>• May trigger memory review process</li>
                        </ul>
                      </div>

                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h5 className="font-medium text-blue-800 mb-2">Neutral Actions</h5>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Dismissal logged for pattern analysis</li>
                          <li>• Context timing adjustments made</li>
                          <li>• User preference learning continues</li>
                          <li>• No immediate confidence changes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">User Preference Interface</h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900">Memory Surfacing</span>
                        <Badge variant="default" className="text-xs">Enabled</Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h5 className="font-medium text-slate-900">Notification Preferences</h5>
                          <div className="space-y-1 text-sm">
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" checked className="rounded" />
                              <span>Inline suggestions</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" checked className="rounded" />
                              <span>Hover tooltips</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <span>Sidebar notifications</span>
                            </label>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="font-medium text-slate-900">Context Sensitivity</h5>
                          <div className="space-y-1 text-sm">
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" checked className="rounded" />
                              <span>High priority contexts only</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" checked className="rounded" />
                              <span>Respect do-not-disturb status</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <span>Learn from my dismissals</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-indigo-600" />
                <span>Real-World Surfacing Examples</span>
              </CardTitle>
              <CardDescription>
                Actual scenarios showing how Olis contextually surfaces knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {surfacingExamples.map((example, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-900">{example.scenario}</h4>
                      <Badge variant="outline" className="text-xs">
                        {(example.confidence * 100).toFixed(0)}% confidence
                      </Badge>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-slate-900 text-sm mb-1">Context</h5>
                          <p className="text-sm text-slate-600">{example.context}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-slate-900 text-sm mb-1">Trigger</h5>
                          <p className="text-sm text-slate-600">{example.trigger}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-slate-900 text-sm mb-1">Surfacing Method</h5>
                          <p className="text-sm text-slate-600">{example.surfacing}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-slate-900 text-sm mb-1">User Action</h5>
                          <p className="text-sm text-slate-600">{example.userAction}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-slate-900 text-sm mb-1">Outcome</h5>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <p className="text-sm text-green-700">{example.outcome}</p>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${example.confidence * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Surfacing Success Metrics</h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">87%</div>
                      <div className="text-sm text-green-700">Acceptance Rate</div>
                    </div>
                    
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">2.3s</div>
                      <div className="text-sm text-blue-700">Avg. Response Time</div>
                    </div>
                    
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">94%</div>
                      <div className="text-sm text-purple-700">Context Accuracy</div>
                    </div>
                    
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">12%</div>
                      <div className="text-sm text-orange-700">False Positive Rate</div>
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