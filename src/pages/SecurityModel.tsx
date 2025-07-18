import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Users, 
  Eye, 
  FileText, 
  AlertTriangle,
  Lock,
  Key,
  Clock,
  GitBranch,
  CheckCircle
} from 'lucide-react';

export default function SecurityModel() {
  const [selectedRoleLevel, setSelectedRoleLevel] = useState('executive');

  const roleHierarchy = [
    { 
      level: 'executive', 
      name: 'Executive', 
      permissions: ['read', 'write', 'approve', 'delegate', 'admin'], 
      clearance: 'confidential',
      color: 'red',
      description: 'C-level executives with full system access'
    },
    { 
      level: 'director', 
      name: 'Director', 
      permissions: ['read', 'write', 'approve', 'delegate'], 
      clearance: 'restricted',
      color: 'orange',
      description: 'Department directors with approval authority'
    },
    { 
      level: 'manager', 
      name: 'Manager', 
      permissions: ['read', 'write', 'approve'], 
      clearance: 'internal',
      color: 'yellow',
      description: 'Team managers with limited approval scope'
    },
    { 
      level: 'senior', 
      name: 'Senior Employee', 
      permissions: ['read', 'write'], 
      clearance: 'internal',
      color: 'green',
      description: 'Senior staff with content creation rights'
    },
    { 
      level: 'employee', 
      name: 'Employee', 
      permissions: ['read'], 
      clearance: 'general',
      color: 'blue',
      description: 'Standard employees with read-only access'
    },
    { 
      level: 'contractor', 
      name: 'Contractor', 
      permissions: ['read'], 
      clearance: 'public',
      color: 'gray',
      description: 'External contractors with limited access'
    }
  ];

  const auditEventTypes = [
    { type: 'memory_created', description: 'New memory added to system', severity: 'info' },
    { type: 'memory_updated', description: 'Existing memory modified', severity: 'info' },
    { type: 'memory_approved', description: 'Memory approved by SME', severity: 'success' },
    { type: 'memory_rejected', description: 'Memory rejected during review', severity: 'warning' },
    { type: 'memory_surfaced', description: 'Memory shown to user', severity: 'info' },
    { type: 'memory_accessed', description: 'User clicked on surfaced memory', severity: 'info' },
    { type: 'access_denied', description: 'User denied access to memory', severity: 'warning' },
    { type: 'permission_changed', description: 'Access permissions modified', severity: 'warning' },
    { type: 'redaction_applied', description: 'Content redacted for user', severity: 'info' },
    { type: 'escalation_triggered', description: 'Governance escalation initiated', severity: 'error' }
  ];

  const redactionRules = [
    {
      rule: 'Salary Information',
      trigger: 'clearance < "confidential"',
      action: 'Replace with [SALARY INFORMATION REDACTED]',
      scope: 'HR memories'
    },
    {
      rule: 'Technical Details',
      trigger: 'role != "security" AND department != "IT"',
      action: 'Remove technical implementation details',
      scope: 'Security procedures'
    },
    {
      rule: 'Contact Information',
      trigger: 'contractor == true',
      action: 'Hide internal contact details',
      scope: 'All memories'
    },
    {
      rule: 'Financial Data',
      trigger: 'clearance < "restricted"',
      action: 'Redact specific amounts and projections',
      scope: 'Finance memories'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-slate-900">Security & Governance Model</h1>
        </div>
        <p className="text-lg text-slate-600">
          Enterprise-grade security, permissioning, and validation layer with comprehensive audit trails
        </p>
      </div>

      <Tabs defaultValue="rbac" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="rbac">Role-Based Access</TabsTrigger>
          <TabsTrigger value="audit">Audit Trails</TabsTrigger>
          <TabsTrigger value="redaction">Redaction Flow</TabsTrigger>
          <TabsTrigger value="versioning">Version Control</TabsTrigger>
          <TabsTrigger value="escalation">Escalation Paths</TabsTrigger>
        </TabsList>

        <TabsContent value="rbac" className="space-y-6">
          <div className="grid lg:grid-cols-4 gap-4 mb-6">
            {roleHierarchy.map((role) => (
              <Card 
                key={role.level}
                className={`cursor-pointer transition-all ${selectedRoleLevel === role.level ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
                onClick={() => setSelectedRoleLevel(role.level)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full bg-${role.color}-500`}></div>
                    <span>{role.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-xs text-slate-600">Clearance Level</div>
                    <Badge variant="outline" className={`text-${role.color}-600 border-${role.color}-200 text-xs`}>
                      {role.clearance}
                    </Badge>
                    <div className="text-xs text-slate-600 mt-2">{role.permissions.length} permissions</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Role Details: {roleHierarchy.find(r => r.level === selectedRoleLevel)?.name}</span>
                </CardTitle>
                <CardDescription>
                  {roleHierarchy.find(r => r.level === selectedRoleLevel)?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Permissions</h4>
                    <div className="flex flex-wrap gap-2">
                      {roleHierarchy.find(r => r.level === selectedRoleLevel)?.permissions.map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Clearance Level</h4>
                    <Badge variant="outline" className="text-sm">
                      {roleHierarchy.find(r => r.level === selectedRoleLevel)?.clearance}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-purple-600" />
                  <span>Permission Matrix</span>
                </CardTitle>
                <CardDescription>
                  What this role can access across different memory types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">HR Policies</span>
                    <Badge variant={selectedRoleLevel === 'contractor' ? 'destructive' : 'default'} className="text-xs">
                      {selectedRoleLevel === 'contractor' ? 'Denied' : 'Allowed'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Financial Data</span>
                    <Badge variant={['executive', 'director'].includes(selectedRoleLevel) ? 'default' : 'secondary'} className="text-xs">
                      {['executive', 'director'].includes(selectedRoleLevel) ? 'Full Access' : 'Redacted'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Procedures</span>
                    <Badge variant={['executive', 'director', 'manager'].includes(selectedRoleLevel) ? 'default' : 'destructive'} className="text-xs">
                      {['executive', 'director', 'manager'].includes(selectedRoleLevel) ? 'Allowed' : 'Denied'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">General Procedures</span>
                    <Badge variant="default" className="text-xs">Allowed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                <span>Comprehensive Audit Trail</span>
              </CardTitle>
              <CardDescription>
                Every memory edit, approval, rejection, and surfacing event is logged with full context
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Tracked Events</h4>
                    <div className="space-y-2">
                      {auditEventTypes.map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              event.severity === 'success' ? 'bg-green-500' :
                              event.severity === 'warning' ? 'bg-yellow-500' :
                              event.severity === 'error' ? 'bg-red-500' : 'bg-blue-500'
                            }`}></div>
                            <span className="text-sm font-medium">{event.type}</span>
                          </div>
                          <Badge variant="outline" className={`text-xs ${
                            event.severity === 'success' ? 'text-green-600 border-green-200' :
                            event.severity === 'warning' ? 'text-yellow-600 border-yellow-200' :
                            event.severity === 'error' ? 'text-red-600 border-red-200' : 'text-blue-600 border-blue-200'
                          }`}>
                            {event.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Audit Record Structure</h4>
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs">
                      <pre>{`{
  "audit_id": "aud_12345",
  "event_type": "memory_surfaced",
  "timestamp": "2024-01-15T14:30:00Z",
  "user_id": "usr_67890",
  "user_context": {
    "role": "employee",
    "department": "procurement",
    "app": "slack",
    "ip_address": "10.0.1.100"
  },
  "memory_id": "mem_proc_001",
  "action_details": {
    "confidence_score": 0.89,
    "context_match": "vendor approval",
    "surfacing_method": "inline_suggestion"
  },
  "result": "accepted",
  "metadata": {
    "session_id": "sess_abc123",
    "request_id": "req_def456"
  }
}`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redaction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-orange-600" />
                <span>Dynamic Content Redaction</span>
              </CardTitle>
              <CardDescription>
                Automatically redact sensitive information based on user role and clearance level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Redaction Rules</h4>
                    <div className="space-y-3">
                      {redactionRules.map((rule, index) => (
                        <div key={index} className="p-3 border border-slate-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-slate-900">{rule.rule}</h5>
                            <Badge variant="outline" className="text-xs">{rule.scope}</Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{rule.action}</p>
                          <div className="text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded">
                            Trigger: {rule.trigger}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Redaction Example</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h5 className="font-medium text-green-800 mb-2">Original Content (Director View)</h5>
                        <p className="text-sm text-green-700">
                          "The new hire salary range is $85,000-$95,000. Contact Sarah Chen (sarah.chen@company.com) 
                          for approval. Security clearance required: Level 2."
                        </p>
                      </div>
                      
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h5 className="font-medium text-yellow-800 mb-2">Employee View (Redacted)</h5>
                        <p className="text-sm text-yellow-700">
                          "The new hire salary range is [SALARY INFORMATION REDACTED]. Contact Sarah Chen 
                          for approval. Security clearance required: Level 2."
                        </p>
                      </div>
                      
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <h5 className="font-medium text-red-800 mb-2">Contractor View (Heavily Redacted)</h5>
                        <p className="text-sm text-red-700">
                          "The new hire salary range is [SALARY INFORMATION REDACTED]. Contact [INTERNAL CONTACT REDACTED] 
                          for approval. [SECURITY INFORMATION REDACTED]."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="versioning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitBranch className="h-5 w-5 text-purple-600" />
                <span>Immutable Version Control</span>
              </CardTitle>
              <CardDescription>
                Complete change history with diff tracking and rollback capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Version History Example</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center font-semibold">v3</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-green-800">Current Version</span>
                            <Badge variant="default" className="text-xs">Active</Badge>
                          </div>
                          <p className="text-sm text-green-700">Updated approval workflow steps</p>
                          <p className="text-xs text-green-600">By: Sarah Chen • 2024-01-15 14:30</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded-full text-xs flex items-center justify-center font-semibold">v2</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-800">Previous Version</span>
                            <Badge variant="secondary" className="text-xs">Archived</Badge>
                          </div>
                          <p className="text-sm text-slate-700">Added budget thresholds</p>
                          <p className="text-xs text-slate-600">By: Mike Johnson • 2024-01-10 09:15</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded-full text-xs flex items-center justify-center font-semibold">v1</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-800">Initial Version</span>
                            <Badge variant="secondary" className="text-xs">Archived</Badge>
                          </div>
                          <p className="text-sm text-slate-700">Created procurement policy memory</p>
                          <p className="text-xs text-slate-600">By: Sarah Chen • 2024-01-05 16:45</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Change Diff Tracking</h4>
                    <div className="bg-slate-900 text-sm p-4 rounded-lg">
                      <div className="space-y-2">
                        <div className="text-green-400">+ Step 3: Finance team review (added)</div>
                        <div className="text-red-400">- Step 3: Direct manager approval (removed)</div>
                        <div className="text-blue-400">~ Step 4: Budget threshold changed from $5K to $10K</div>
                        <div className="text-slate-400">  Step 1: Submit vendor form (unchanged)</div>
                        <div className="text-slate-400">  Step 2: Legal review (unchanged)</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-medium text-slate-900">Version Control Features</h5>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Immutable change history</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Granular diff tracking</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">One-click rollback capability</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Approval chain preservation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escalation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>Governance Escalation Paths</span>
              </CardTitle>
              <CardDescription>
                Structured escalation workflows for disputed memories and policy violations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Escalation Triggers</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <h5 className="font-medium text-red-800">High Rejection Rate</h5>
                        <p className="text-sm text-red-700">Memory rejected by &gt;30% of users who see it</p>
                        <Badge variant="destructive" className="mt-2 text-xs">Auto-escalate</Badge>
                      </div>
                      
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h5 className="font-medium text-yellow-800">Conflicting Information</h5>
                        <p className="text-sm text-yellow-700">Multiple memories with contradictory answers</p>
                        <Badge variant="outline" className="mt-2 text-xs text-yellow-600 border-yellow-200">Review required</Badge>
                      </div>
                      
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <h5 className="font-medium text-orange-800">Stale Content</h5>
                        <p className="text-sm text-orange-700">Memory not updated beyond expiration policy</p>
                        <Badge variant="outline" className="mt-2 text-xs text-orange-600 border-orange-200">Urgent review</Badge>
                      </div>
                      
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <h5 className="font-medium text-purple-800">Access Violations</h5>
                        <p className="text-sm text-purple-700">Repeated attempts to access restricted content</p>
                        <Badge variant="destructive" className="mt-2 text-xs">Security alert</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Escalation Workflow</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center font-semibold">1</div>
                        <div className="flex-1">
                          <h5 className="font-medium text-slate-900">Automatic Detection</h5>
                          <p className="text-sm text-slate-600">System identifies escalation trigger</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center font-semibold">2</div>
                        <div className="flex-1">
                          <h5 className="font-medium text-slate-900">SME Notification</h5>
                          <p className="text-sm text-slate-600">Alert sent to subject matter expert</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center font-semibold">3</div>
                        <div className="flex-1">
                          <h5 className="font-medium text-slate-900">Review & Resolution</h5>
                          <p className="text-sm text-slate-600">SME reviews and takes corrective action</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full text-xs flex items-center justify-center font-semibold">4</div>
                        <div className="flex-1">
                          <h5 className="font-medium text-slate-900">Escalation (if needed)</h5>
                          <p className="text-sm text-slate-600">Escalate to department head or governance committee</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Service Level Agreements (SLAs)</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="font-semibold text-green-800">Standard Review</div>
                      <div className="text-sm text-green-700">48 hours</div>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                      <AlertTriangle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                      <div className="font-semibold text-yellow-800">Urgent Review</div>
                      <div className="text-sm text-yellow-700">24 hours</div>
                    </div>
                    
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                      <Lock className="h-6 w-6 text-red-600 mx-auto mb-2" />
                      <div className="font-semibold text-red-800">Security Alert</div>
                      <div className="text-sm text-red-700">4 hours</div>
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