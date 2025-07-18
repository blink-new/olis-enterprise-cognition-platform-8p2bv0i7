import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  Database, 
  Cpu, 
  Shield, 
  CheckCircle, 
  Network, 
  Zap,
  ArrowRight,
  Clock,
  Users,
  Lock,
  GitBranch
} from 'lucide-react';

export default function TechnicalBlueprint() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Brain className="h-12 w-12 text-blue-600 animate-pulse" />
          <h1 className="text-4xl font-bold text-slate-900">Olis Technical Blueprint</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto">
          Enterprise Cognition Infrastructure - A private-deployed ambient memory system that contextually surfaces 
          real-time, human-verified operational knowledge within enterprise environments.
        </p>
        <div className="flex items-center justify-center space-x-4 mt-6">
          <Badge variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 transition-colors">AI-Native</Badge>
          <Badge variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 transition-colors">Private Deployed</Badge>
          <Badge variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50 transition-colors">SOC2 Compliant</Badge>
          <Badge variant="outline" className="text-orange-600 border-orange-200 hover:bg-orange-50 transition-colors">Human-in-the-Loop</Badge>
        </div>
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">10K+</div>
            <div className="text-sm text-blue-700">Documents/Hour</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">&lt;100ms</div>
            <div className="text-sm text-green-700">Memory Surfacing</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">99.9%</div>
            <div className="text-sm text-purple-700">Uptime SLA</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">Zero</div>
            <div className="text-sm text-orange-700">Data Egress</div>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span>Core Functional Principles</span>
          </CardTitle>
          <CardDescription>
            Non-negotiable functional properties that define Olis as cognitive infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Inline Delivery</h4>
                  <p className="text-sm text-slate-600">Like Grammarly, but for operational memory. Surfaces knowledge contextually in tools (Slack, Outlook, Notion, internal portals).</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Human-in-the-Loop Validation</h4>
                  <p className="text-sm text-slate-600">Every new piece of knowledge must be reviewed and permissioned by a human team lead or SME before being surfaced.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Semantic Pattern Matching</h4>
                  <p className="text-sm text-slate-600">Different teams ask the same question in different ways. Olis resolves linguistic variance to route users to the same trusted canonical answer.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Live Governance</h4>
                  <p className="text-sm text-slate-600">Ops or knowledge managers can update, restrict, or expand answers. Audit trails are built-in. System adapts as processes change.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Private Deployed</h4>
                  <p className="text-sm text-slate-600">Runs in customer cloud (VPC or on-prem) with no data leaving. SOC2+ and enterprise InfoSec compliant.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Pretrained Operational Spine</h4>
                  <p className="text-sm text-slate-600">Comes with base-level schema and logic for enterprise domains: procurement, onboarding, legal, finance, IT, etc.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Components Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-blue-600" />
              <span>Memory System Structure</span>
            </CardTitle>
            <CardDescription>
              Core data schema and memory object model for knowledge units
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Canonical Questions</span>
                <Badge variant="secondary">Schema</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Semantic Variants</span>
                <Badge variant="secondary">NLP</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Access Control Tags</span>
                <Badge variant="secondary">RBAC</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Version History</span>
                <Badge variant="secondary">Audit</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>Cognition Engine Logic</span>
            </CardTitle>
            <CardDescription>
              Core logic engine governing when and how knowledge is surfaced
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Context Parsing</span>
                <Badge variant="secondary">AI</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Intent Classification</span>
                <Badge variant="secondary">ML</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Confidence Thresholding</span>
                <Badge variant="secondary">Logic</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Multi-Memory Stitching</span>
                <Badge variant="secondary">Graph</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span>Security & Governance</span>
            </CardTitle>
            <CardDescription>
              Enterprise-grade security, permissioning, and validation layer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Role-Based Access Control</span>
                <Badge variant="secondary">RBAC</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Audit Trails</span>
                <Badge variant="secondary">Compliance</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Redaction Flow</span>
                <Badge variant="secondary">Privacy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Version Control</span>
                <Badge variant="secondary">Immutable</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-orange-600" />
              <span>Human-in-the-Loop Validation</span>
            </CardTitle>
            <CardDescription>
              Workflow UI and backend orchestration for knowledge approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Approval Queue Interface</span>
                <Badge variant="secondary">UI/UX</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Batch Actions</span>
                <Badge variant="secondary">Workflow</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Delegation System</span>
                <Badge variant="secondary">Management</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">SLA Metrics</span>
                <Badge variant="secondary">Analytics</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Development Roadmap */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GitBranch className="h-5 w-5 text-indigo-600" />
            <span>Phased Development Roadmap</span>
          </CardTitle>
          <CardDescription>
            Strategic deployment phases from prototype to enterprise-scale federated learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">1</div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">Prototype Phase</h4>
                <p className="text-sm text-slate-600">Core memory schema, basic cognition engine, single-tenant deployment</p>
              </div>
              <Badge variant="outline" className="text-blue-600 border-blue-200">3 months</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full text-sm font-semibold">2</div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">Private Alpha</h4>
                <p className="text-sm text-slate-600">Human-in-the-loop validation, enterprise integrations, security hardening</p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200">6 months</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">3</div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">First Client Deployment</h4>
                <p className="text-sm text-slate-600">Production deployment, SOC2 compliance, multi-tenant architecture</p>
              </div>
              <Badge variant="outline" className="text-purple-600 border-purple-200">9 months</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">4</div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">Live Feedback Loop</h4>
                <p className="text-sm text-slate-600">Continuous learning, advanced analytics, performance optimization</p>
              </div>
              <Badge variant="outline" className="text-orange-600 border-orange-200">12 months</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full text-sm font-semibold">5</div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">Federated Learning</h4>
                <p className="text-sm text-slate-600">Cross-enterprise learning, privacy-preserving model updates, scale optimization</p>
              </div>
              <Badge variant="outline" className="text-red-600 border-red-200">18 months</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Differentiators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span>Key Differentiators</span>
          </CardTitle>
          <CardDescription>
            What makes Olis unique in the enterprise AI landscape
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Not a Chatbot</h4>
              <p className="text-sm text-slate-600">Cognitive infrastructure that embeds memory directly into workflows, not conversational AI</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Human-Verified</h4>
              <p className="text-sm text-slate-600">Every piece of knowledge is validated by subject matter experts before surfacing</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Lock className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Private by Design</h4>
              <p className="text-sm text-slate-600">Deployed in customer infrastructure with zero data leaving the enterprise boundary</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}