import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Cpu, 
  Network, 
  Shield, 
  TrendingUp, 
  Users, 
  Lock,
  RefreshCw,
  Eye,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Settings
} from 'lucide-react';

export default function FederatedLearning() {
  const [federatedEnabled, setFederatedEnabled] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState('org1');

  const participatingOrgs = [
    { 
      id: 'org1', 
      name: 'TechCorp Industries', 
      industry: 'Technology', 
      employees: '15K+',
      contribution: 'High',
      status: 'active',
      joinDate: '2024-01-15'
    },
    { 
      id: 'org2', 
      name: 'Global Finance Ltd', 
      industry: 'Financial Services', 
      employees: '8K+',
      contribution: 'Medium',
      status: 'active',
      joinDate: '2024-02-03'
    },
    { 
      id: 'org3', 
      name: 'MedTech Solutions', 
      industry: 'Healthcare', 
      employees: '12K+',
      contribution: 'High',
      status: 'pending',
      joinDate: '2024-03-10'
    },
    { 
      id: 'org4', 
      name: 'Manufacturing Co', 
      industry: 'Manufacturing', 
      employees: '25K+',
      contribution: 'Low',
      status: 'active',
      joinDate: '2024-01-28'
    }
  ];

  const learningMetrics = [
    { metric: 'Model Accuracy Improvement', value: '+12.3%', trend: 'up', description: 'Cross-org pattern recognition' },
    { metric: 'Semantic Variant Coverage', value: '+847', trend: 'up', description: 'New question phrasings learned' },
    { metric: 'Context Understanding', value: '+18.7%', trend: 'up', description: 'Better situational awareness' },
    { metric: 'False Positive Reduction', value: '-23.1%', trend: 'down', description: 'Fewer incorrect surfacings' },
    { metric: 'Response Relevance', value: '+15.4%', trend: 'up', description: 'More contextually appropriate' },
    { metric: 'Cross-Industry Insights', value: '156', trend: 'up', description: 'Transferable best practices' }
  ];

  const privacyGuarantees = [
    {
      guarantee: 'Zero Raw Data Sharing',
      description: 'Only model gradients and aggregated patterns are shared',
      implementation: 'Differential privacy with ε=0.1',
      status: 'enforced'
    },
    {
      guarantee: 'Homomorphic Encryption',
      description: 'All federated updates are encrypted during transmission',
      implementation: 'SEAL library with 128-bit security',
      status: 'enforced'
    },
    {
      guarantee: 'Secure Aggregation',
      description: 'Individual contributions cannot be reverse-engineered',
      implementation: 'Multi-party computation protocols',
      status: 'enforced'
    },
    {
      guarantee: 'Audit Trail Transparency',
      description: 'Complete visibility into what data influences your models',
      implementation: 'Cryptographic proofs of contribution',
      status: 'enforced'
    }
  ];

  const trainingSignals = [
    {
      signal: 'Approved Memory Patterns',
      description: 'Successful human-approved memories contribute to semantic understanding',
      frequency: 'Daily aggregation',
      privacy: 'Content-agnostic embeddings only'
    },
    {
      signal: 'Surfacing Success Rates',
      description: 'Which contexts lead to accepted vs rejected memory surfacing',
      frequency: 'Real-time feedback',
      privacy: 'Anonymized interaction patterns'
    },
    {
      signal: 'Query Intent Classification',
      description: 'Improved understanding of user intent across different phrasings',
      frequency: 'Weekly model updates',
      privacy: 'Tokenized query patterns'
    },
    {
      signal: 'Context Disambiguation',
      description: 'Better resolution of ambiguous queries based on situational context',
      frequency: 'Bi-weekly refinement',
      privacy: 'Abstracted context vectors'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Cpu className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-slate-900">Federated Learning & Continuous Improvement</h1>
        </div>
        <p className="text-lg text-slate-600">
          Privacy-preserving cross-enterprise learning that improves Olis cognition without exposing sensitive data
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Guarantees</TabsTrigger>
          <TabsTrigger value="training">Training Signals</TabsTrigger>
          <TabsTrigger value="governance">Client Control</TabsTrigger>
          <TabsTrigger value="metrics">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5 text-blue-600" />
                  <span>Federated Network Status</span>
                </CardTitle>
                <CardDescription>
                  Current participation in the Olis federated learning network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Federated Learning</span>
                    <Switch 
                      checked={federatedEnabled} 
                      onCheckedChange={setFederatedEnabled}
                    />
                  </div>
                  
                  {federatedEnabled && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Network Participants</span>
                        <Badge variant="default" className="text-xs">{participatingOrgs.filter(org => org.status === 'active').length} Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Your Contribution Level</span>
                        <Badge variant="outline" className="text-xs text-green-600 border-green-200">High</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Last Model Update</span>
                        <span className="text-xs text-slate-600">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Privacy Level</span>
                        <Badge variant="outline" className="text-xs text-purple-600 border-purple-200">Maximum</Badge>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Learning Benefits</span>
                </CardTitle>
                <CardDescription>
                  Improvements gained from federated learning participation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {learningMetrics.slice(0, 4).map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">{metric.metric}</div>
                        <div className="text-xs text-slate-600">{metric.description}</div>
                      </div>
                      <div className={`text-sm font-semibold ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>Network Participants</span>
              </CardTitle>
              <CardDescription>
                Organizations contributing to the federated learning network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid lg:grid-cols-4 gap-4">
                  {participatingOrgs.map((org) => (
                    <div 
                      key={org.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedOrg === org.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedOrg(org.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-sm text-slate-900">{org.name}</h5>
                        <Badge variant={org.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                          {org.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-xs text-slate-600">
                        <div>{org.industry}</div>
                        <div>{org.employees} employees</div>
                        <div>Contribution: {org.contribution}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-slate-900 mb-3">Selected Organization Details</h4>
                  {(() => {
                    const org = participatingOrgs.find(o => o.id === selectedOrg);
                    return org ? (
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-slate-900 mb-2">{org.name}</h5>
                            <div className="space-y-1 text-sm text-slate-600">
                              <div><strong>Industry:</strong> {org.industry}</div>
                              <div><strong>Size:</strong> {org.employees} employees</div>
                              <div><strong>Joined:</strong> {org.joinDate}</div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-slate-900 mb-2">Contribution Metrics</h5>
                            <div className="space-y-1 text-sm text-slate-600">
                              <div><strong>Data Quality:</strong> {org.contribution}</div>
                              <div><strong>Update Frequency:</strong> Daily</div>
                              <div><strong>Privacy Compliance:</strong> ✓ Verified</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Privacy-Preserving Architecture</span>
              </CardTitle>
              <CardDescription>
                Mathematical guarantees that no raw enterprise data leaves your infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Privacy Guarantees</h4>
                    <div className="space-y-3">
                      {privacyGuarantees.map((guarantee, index) => (
                        <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-green-800">{guarantee.guarantee}</h5>
                            <Badge variant="default" className="text-xs bg-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {guarantee.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-green-700 mb-2">{guarantee.description}</p>
                          <div className="text-xs text-green-600 font-mono bg-green-100 p-2 rounded">
                            {guarantee.implementation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Technical Implementation</h4>
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs">
                      <pre>{`// Federated Learning Privacy Flow
class FederatedPrivacyEngine {
  
  // 1. Local model training
  trainLocalModel(localData) {
    const model = this.baseModel.clone();
    const gradients = model.train(localData);
    
    // Apply differential privacy
    return this.addNoise(gradients, epsilon=0.1);
  }
  
  // 2. Secure aggregation
  secureAggregate(encryptedGradients) {
    // Homomorphic encryption allows computation
    // on encrypted data without decryption
    const aggregated = this.homomorphicSum(
      encryptedGradients
    );
    
    return this.threshold_decrypt(aggregated);
  }
  
  // 3. Model update without data exposure
  updateGlobalModel(aggregatedGradients) {
    // Only statistical patterns, never raw data
    this.globalModel.applyGradients(
      aggregatedGradients
    );
  }
}`}</pre>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">What Gets Shared vs. What Stays Private</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="font-medium text-green-800 flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Shared (Privacy-Preserved)</span>
                      </h5>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li>• Anonymized semantic patterns</li>
                        <li>• Aggregated model gradients</li>
                        <li>• Statistical confidence scores</li>
                        <li>• Context classification improvements</li>
                        <li>• Intent recognition patterns</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-medium text-red-800 flex items-center space-x-2">
                        <Lock className="h-4 w-4" />
                        <span>Never Shared (Stays Private)</span>
                      </h5>
                      <ul className="space-y-2 text-sm text-red-700">
                        <li>• Raw memory content</li>
                        <li>• Employee names or identifiers</li>
                        <li>• Specific business processes</li>
                        <li>• Proprietary information</li>
                        <li>• Individual user interactions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-blue-600" />
                <span>Training Signal Architecture</span>
              </CardTitle>
              <CardDescription>
                How Olis learns from collective enterprise knowledge while preserving privacy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Local Learning Loop</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center font-semibold">1</div>
                        <div className="flex-1">
                          <h5 className="font-medium text-blue-800">User Interactions</h5>
                          <p className="text-sm text-blue-700">Memory surfacing, acceptance, rejection feedback</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center font-semibold">2</div>
                        <div className="flex-1">
                          <h5 className="font-medium text-green-800">Pattern Extraction</h5>
                          <p className="text-sm text-green-700">Identify successful context-memory matches</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center font-semibold">3</div>
                        <div className="flex-1">
                          <h5 className="font-medium text-purple-800">Local Model Update</h5>
                          <p className="text-sm text-purple-700">Improve local cognition engine performance</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Federated Learning Loop</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full text-xs flex items-center justify-center font-semibold">4</div>
                        <div className="flex-1">
                          <h5 className="font-medium text-orange-800">Privacy-Preserved Sharing</h5>
                          <p className="text-sm text-orange-700">Encrypted gradients sent to federation</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center font-semibold">5</div>
                        <div className="flex-1">
                          <h5 className="font-medium text-red-800">Secure Aggregation</h5>
                          <p className="text-sm text-red-700">Cross-enterprise patterns identified</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full text-xs flex items-center justify-center font-semibold">6</div>
                        <div className="flex-1">
                          <h5 className="font-medium text-indigo-800">Global Model Update</h5>
                          <p className="text-sm text-indigo-700">Enhanced model distributed back</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Training Signal Types</h4>
                  <div className="space-y-3">
                    {trainingSignals.map((signal, index) => (
                      <div key={index} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-slate-900">{signal.signal}</h5>
                          <Badge variant="outline" className="text-xs">{signal.frequency}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{signal.description}</p>
                        <div className="text-xs text-slate-500">
                          <strong>Privacy:</strong> {signal.privacy}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-purple-600" />
                <span>Client Control & Governance</span>
              </CardTitle>
              <CardDescription>
                Complete control over participation, data contribution, and model updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Participation Controls</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <h5 className="font-medium text-slate-900">Enable Federated Learning</h5>
                          <p className="text-sm text-slate-600">Participate in cross-enterprise learning</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <h5 className="font-medium text-slate-900">Contribute Training Data</h5>
                          <p className="text-sm text-slate-600">Share anonymized patterns for collective learning</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <h5 className="font-medium text-slate-900">Receive Model Updates</h5>
                          <p className="text-sm text-slate-600">Get improvements from federated learning</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <h5 className="font-medium text-slate-900">Auto-Apply Updates</h5>
                          <p className="text-sm text-slate-600">Automatically integrate approved model improvements</p>
                        </div>
                        <Switch checked={false} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Audit & Transparency</h4>
                    <div className="space-y-3">
                      <div className="p-3 border border-slate-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Eye className="h-4 w-4 text-blue-600" />
                          <h5 className="font-medium text-slate-900">Full Audit Visibility</h5>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">Complete transparency into what data influences your models</p>
                        <Button size="sm" variant="outline">View Audit Log</Button>
                      </div>
                      
                      <div className="p-3 border border-slate-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <RefreshCw className="h-4 w-4 text-green-600" />
                          <h5 className="font-medium text-slate-900">Model Rollback</h5>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">Revert to previous model versions if needed</p>
                        <Button size="sm" variant="outline">Manage Versions</Button>
                      </div>
                      
                      <div className="p-3 border border-slate-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <h5 className="font-medium text-slate-900">Impact Assessment</h5>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">Understand how federated updates affect your system</p>
                        <Button size="sm" variant="outline">View Impact Report</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Governance Framework</h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Users className="h-6 w-6" />
                        </div>
                        <h5 className="font-semibold text-slate-900 mb-2">Opt-In Only</h5>
                        <p className="text-sm text-slate-600">Voluntary participation with full control over contribution level</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Eye className="h-6 w-6" />
                        </div>
                        <h5 className="font-semibold text-slate-900 mb-2">Full Transparency</h5>
                        <p className="text-sm text-slate-600">Complete visibility into federated learning processes and outcomes</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <RefreshCw className="h-6 w-6" />
                        </div>
                        <h5 className="font-semibold text-slate-900 mb-2">Reversible</h5>
                        <p className="text-sm text-slate-600">Ability to rollback changes and exit federation at any time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <span>Federated Learning Performance</span>
              </CardTitle>
              <CardDescription>
                Measurable improvements from cross-enterprise learning participation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-4">
                  {learningMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-slate-900 text-sm">{metric.metric}</h5>
                        <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                          {metric.trend === 'up' ? '↗' : '↘'}
                        </Badge>
                      </div>
                      <div className={`text-2xl font-bold mb-1 ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-slate-600">{metric.description}</div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Learning Velocity</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                        <span className="text-sm font-medium">Model Updates/Week</span>
                        <span className="text-sm text-blue-600 font-semibold">3.2</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span className="text-sm font-medium">New Patterns Learned</span>
                        <span className="text-sm text-green-600 font-semibold">847</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                        <span className="text-sm font-medium">Cross-Industry Insights</span>
                        <span className="text-sm text-purple-600 font-semibold">156</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Quality Improvements</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                        <span className="text-sm font-medium">Precision Increase</span>
                        <span className="text-sm text-orange-600 font-semibold">+18.7%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                        <span className="text-sm font-medium">False Positives Reduced</span>
                        <span className="text-sm text-red-600 font-semibold">-23.1%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-indigo-50 rounded">
                        <span className="text-sm font-medium">Context Accuracy</span>
                        <span className="text-sm text-indigo-600 font-semibold">+15.4%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Federated vs. Local Performance</h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-slate-900 mb-3">With Federated Learning</h5>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Query Understanding</span>
                            <span className="text-sm font-semibold text-green-600">94.2%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Context Relevance</span>
                            <span className="text-sm font-semibold text-green-600">89.7%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">User Satisfaction</span>
                            <span className="text-sm font-semibold text-green-600">4.3/5</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-slate-900 mb-3">Local Only (Baseline)</h5>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Query Understanding</span>
                            <span className="text-sm font-semibold text-slate-600">81.9%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Context Relevance</span>
                            <span className="text-sm font-semibold text-slate-600">74.3%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">User Satisfaction</span>
                            <span className="text-sm font-semibold text-slate-600">3.8/5</span>
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
      </Tabs>
    </div>
  );
}