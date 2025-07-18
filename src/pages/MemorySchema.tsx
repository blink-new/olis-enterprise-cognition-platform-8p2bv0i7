import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  FileText, 
  Users, 
  Clock, 
  Shield, 
  GitBranch,
  Eye,
  Code,
  Network
} from 'lucide-react';

export default function MemorySchema() {
  const [selectedSchema, setSelectedSchema] = useState('memory');

  const memorySchema = {
    memory_id: { type: 'UUID', description: 'Unique identifier for the memory unit', required: true },
    canonical_question: { type: 'TEXT', description: 'Primary, normalized question this memory answers', required: true },
    semantic_variants: { type: 'TEXT[]', description: 'Array of alternative phrasings and questions', required: false },
    answer_content: { type: 'JSONB', description: 'Rich content including markdown, attachments, links', required: true },
    authoritative_source: { type: 'JSONB', description: 'Source document/system with confidence score', required: true },
    human_approver: { type: 'JSONB', description: 'Approver details with role and timestamp', required: true },
    departmental_context: { type: 'TEXT[]', description: 'Relevant departments and business units', required: true },
    related_workflows: { type: 'UUID[]', description: 'Connected processes and dependencies', required: false },
    access_control_tags: { type: 'JSONB', description: 'Permission matrix for teams, roles, clearance', required: true },
    expiration_policy: { type: 'JSONB', description: 'Auto-expiry rules or human confirmation required', required: true },
    usage_statistics: { type: 'JSONB', description: 'Query frequency, last accessed, user interactions', required: false },
    memory_embeddings: { type: 'VECTOR(1536)', description: 'Semantic embeddings for similarity matching', required: true },
    created_at: { type: 'TIMESTAMP', description: 'Memory creation timestamp', required: true },
    updated_at: { type: 'TIMESTAMP', description: 'Last modification timestamp', required: true },
    version: { type: 'INTEGER', description: 'Version number for change tracking', required: true },
    status: { type: 'ENUM', description: 'draft, pending_approval, approved, expired, archived', required: true }
  };

  const versionHistorySchema = {
    version_id: { type: 'UUID', description: 'Unique version identifier', required: true },
    memory_id: { type: 'UUID', description: 'Reference to parent memory', required: true },
    version_number: { type: 'INTEGER', description: 'Sequential version number', required: true },
    change_type: { type: 'ENUM', description: 'created, updated, approved, expired, archived', required: true },
    changed_by: { type: 'UUID', description: 'User who made the change', required: true },
    change_summary: { type: 'TEXT', description: 'Human-readable description of changes', required: true },
    content_diff: { type: 'JSONB', description: 'Structured diff of what changed', required: true },
    approval_chain: { type: 'JSONB', description: 'Complete approval workflow history', required: false },
    created_at: { type: 'TIMESTAMP', description: 'Version creation timestamp', required: true }
  };

  const accessControlSchema = {
    rule_id: { type: 'UUID', description: 'Unique access rule identifier', required: true },
    memory_id: { type: 'UUID', description: 'Memory this rule applies to', required: true },
    rule_type: { type: 'ENUM', description: 'allow, deny, redact, time_limited', required: true },
    subject_type: { type: 'ENUM', description: 'user, role, department, clearance_level', required: true },
    subject_identifier: { type: 'TEXT', description: 'Specific user/role/dept identifier', required: true },
    permissions: { type: 'TEXT[]', description: 'read, write, approve, delegate', required: true },
    conditions: { type: 'JSONB', description: 'Time, location, context conditions', required: false },
    redaction_rules: { type: 'JSONB', description: 'What to redact for this subject', required: false },
    created_by: { type: 'UUID', description: 'Who created this access rule', required: true },
    created_at: { type: 'TIMESTAMP', description: 'Rule creation timestamp', required: true },
    expires_at: { type: 'TIMESTAMP', description: 'Optional rule expiration', required: false }
  };

  const renderSchemaTable = (schema: any, title: string) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-50">
              <th className="border border-slate-300 px-4 py-2 text-left font-semibold">Field</th>
              <th className="border border-slate-300 px-4 py-2 text-left font-semibold">Type</th>
              <th className="border border-slate-300 px-4 py-2 text-left font-semibold">Required</th>
              <th className="border border-slate-300 px-4 py-2 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(schema).map(([field, config]: [string, any]) => (
              <tr key={field} className="hover:bg-slate-50">
                <td className="border border-slate-300 px-4 py-2 font-mono text-sm text-blue-600">{field}</td>
                <td className="border border-slate-300 px-4 py-2">
                  <Badge variant="outline" className="text-xs">{config.type}</Badge>
                </td>
                <td className="border border-slate-300 px-4 py-2">
                  <Badge variant={config.required ? "default" : "secondary"} className="text-xs">
                    {config.required ? "Required" : "Optional"}
                  </Badge>
                </td>
                <td className="border border-slate-300 px-4 py-2 text-sm text-slate-600">{config.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-900">Memory System Structure</h1>
        </div>
        <p className="text-lg text-slate-600">
          Complete data schema and memory object model for Olis' core unit of knowledge — the "Memory"
        </p>
      </div>

      <Tabs defaultValue="schema" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schema">Core Schema</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="schema" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedSchema('memory')}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Core Memory</span>
                </CardTitle>
                <CardDescription className="text-sm">Primary memory object with all essential fields</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{Object.keys(memorySchema).length}</div>
                <div className="text-sm text-slate-600">Fields</div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedSchema('version')}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <GitBranch className="h-4 w-4 text-green-600" />
                  <span>Version History</span>
                </CardTitle>
                <CardDescription className="text-sm">Immutable change tracking and audit trail</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{Object.keys(versionHistorySchema).length}</div>
                <div className="text-sm text-slate-600">Fields</div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedSchema('access')}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <span>Access Control</span>
                </CardTitle>
                <CardDescription className="text-sm">Granular permission and redaction rules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{Object.keys(accessControlSchema).length}</div>
                <div className="text-sm text-slate-600">Fields</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              {selectedSchema === 'memory' && renderSchemaTable(memorySchema, 'Core Memory Schema')}
              {selectedSchema === 'version' && renderSchemaTable(versionHistorySchema, 'Version History Schema')}
              {selectedSchema === 'access' && renderSchemaTable(accessControlSchema, 'Access Control Schema')}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relationships" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="h-5 w-5 text-indigo-600" />
                <span>Entity Relationship Diagram</span>
              </CardTitle>
              <CardDescription>
                How memory objects relate to each other and external systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-6 rounded-lg">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                      MEMORY (Core Entity)
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900">One-to-Many Relationships</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Memory → Version History (1:N)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-sm">Memory → Access Control Rules (1:N)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">Memory → Usage Events (1:N)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm">Memory → Approval Workflows (1:N)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900">Many-to-Many Relationships</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                          <span className="text-sm">Memory ↔ Related Memories (M:N)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                          <span className="text-sm">Memory ↔ Workflows (M:N)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                          <span className="text-sm">Memory ↔ Departments (M:N)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm">Memory ↔ Source Documents (M:N)</span>
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
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Procurement Memory Example</CardTitle>
                <CardDescription>How a vendor approval process would be stored</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto">
{`{
  "memory_id": "mem_proc_001",
  "canonical_question": "How do I get approval for a new vendor?",
  "semantic_variants": [
    "What's the vendor approval process?",
    "How to onboard a new supplier?",
    "Vendor vetting requirements"
  ],
  "answer_content": {
    "markdown": "## Vendor Approval Process\\n1. Submit vendor form\\n2. Legal review\\n3. Finance approval",
    "attachments": ["vendor_form.pdf"],
    "links": ["https://intranet/procurement"]
  },
  "authoritative_source": {
    "document": "Procurement Policy v2.1",
    "confidence": 0.95,
    "last_verified": "2024-01-15"
  },
  "human_approver": {
    "name": "Sarah Chen",
    "role": "Procurement Director",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "departmental_context": ["procurement", "legal", "finance"],
  "access_control_tags": {
    "teams": ["procurement", "finance"],
    "min_role": "employee",
    "clearance": "internal"
  }
}`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">IT Security Memory Example</CardTitle>
                <CardDescription>Sensitive security procedure with redaction rules</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto">
{`{
  "memory_id": "mem_sec_001",
  "canonical_question": "What's the incident response procedure?",
  "semantic_variants": [
    "How to handle security incidents?",
    "Security breach response",
    "Incident escalation process"
  ],
  "answer_content": {
    "markdown": "## Incident Response\\n1. Isolate affected systems\\n2. Contact security team\\n3. [REDACTED]",
    "redaction_rules": {
      "junior_staff": ["step_3", "contact_details"],
      "contractors": ["all_technical_details"]
    }
  },
  "access_control_tags": {
    "teams": ["security", "it"],
    "min_role": "senior",
    "clearance": "confidential"
  },
  "expiration_policy": {
    "type": "time_based",
    "expires_at": "2024-06-01T00:00:00Z",
    "review_required": true
  }
}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-green-600" />
                  <span>Database Implementation</span>
                </CardTitle>
                <CardDescription>PostgreSQL schema with vector extensions</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
{`-- Core Memory Table
CREATE TABLE memories (
  memory_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_question TEXT NOT NULL,
  semantic_variants TEXT[],
  answer_content JSONB NOT NULL,
  authoritative_source JSONB NOT NULL,
  human_approver JSONB NOT NULL,
  departmental_context TEXT[] NOT NULL,
  related_workflows UUID[],
  access_control_tags JSONB NOT NULL,
  expiration_policy JSONB NOT NULL,
  usage_statistics JSONB DEFAULT '{}',
  memory_embeddings VECTOR(1536) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  version INTEGER DEFAULT 1,
  status memory_status DEFAULT 'draft'
);

-- Vector similarity index
CREATE INDEX ON memories 
USING ivfflat (memory_embeddings vector_cosine_ops)
WITH (lists = 100);

-- Full-text search index
CREATE INDEX ON memories 
USING GIN (to_tsvector('english', canonical_question));`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <span>API Interface</span>
                </CardTitle>
                <CardDescription>RESTful API for memory operations</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-900 text-blue-400 p-4 rounded-lg text-xs overflow-x-auto">
{`// Memory retrieval with semantic search
POST /api/v1/memories/search
{
  "query": "vendor approval process",
  "context": {
    "user_role": "employee",
    "department": "procurement",
    "app_context": "slack"
  },
  "filters": {
    "departments": ["procurement", "finance"],
    "max_age_days": 90
  }
}

// Response with ranked memories
{
  "memories": [
    {
      "memory_id": "mem_proc_001",
      "confidence": 0.92,
      "answer_content": {...},
      "redacted_fields": [],
      "last_verified": "2024-01-15"
    }
  ],
  "total_results": 1,
  "search_time_ms": 45
}`}
                </pre>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Considerations</CardTitle>
              <CardDescription>Optimization strategies for enterprise-scale deployment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Vector Search Optimization</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• IVFFlat indexing for sub-100ms similarity search</li>
                    <li>• Embedding caching with Redis for frequent queries</li>
                    <li>• Hierarchical clustering for department-specific indexes</li>
                    <li>• Approximate nearest neighbor for real-time surfacing</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Access Control Performance</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Pre-computed permission matrices per user role</li>
                    <li>• Cached redaction rules for common access patterns</li>
                    <li>• Lazy loading of sensitive content fields</li>
                    <li>• Batch permission checks for multi-memory responses</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}