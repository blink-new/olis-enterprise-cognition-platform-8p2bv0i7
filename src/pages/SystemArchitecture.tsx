import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Network, 
  Database, 
  Cpu, 
  Shield, 
  Cloud,
  Server,
  GitBranch,
  Zap,
  Users,
  Lock,
  RefreshCw,
  ArrowRight,
  Layers,
  Settings
} from 'lucide-react';

export default function SystemArchitecture() {
  const [selectedComponent, setSelectedComponent] = useState('ingestion');

  const architectureComponents = [
    {
      id: 'ingestion',
      name: 'Data Ingestion Pipeline',
      icon: Database,
      description: 'Multi-source data ingestion with real-time processing',
      technologies: ['Apache Kafka', 'Apache Airflow', 'Redis', 'PostgreSQL'],
      scalability: 'Horizontal',
      throughput: '10K+ docs/hour'
    },
    {
      id: 'processing',
      name: 'Processing & Normalization',
      icon: Cpu,
      description: 'LLM-powered semantic processing and content normalization',
      technologies: ['Python', 'Transformers', 'spaCy', 'NLTK'],
      scalability: 'GPU-based',
      throughput: '500 docs/min'
    },
    {
      id: 'vectorstore',
      name: 'Vector Store & Search',
      icon: Zap,
      description: 'High-performance semantic search with hybrid retrieval',
      technologies: ['Weaviate', 'OpenAI Embeddings', 'Elasticsearch'],
      scalability: 'Distributed',
      throughput: '<100ms queries'
    },
    {
      id: 'cognition',
      name: 'Cognition Engine',
      icon: Network,
      description: 'Context-aware decision engine for memory surfacing',
      technologies: ['FastAPI', 'PyTorch', 'Redis Cache'],
      scalability: 'Auto-scaling',
      throughput: '1K+ decisions/sec'
    },
    {
      id: 'governance',
      name: 'Governance Layer',
      icon: Shield,
      description: 'Human-in-the-loop validation and access control',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Auth0'],
      scalability: 'Load balanced',
      throughput: 'Real-time'
    },
    {
      id: 'delivery',
      name: 'Delivery Integrations',
      icon: Users,
      description: 'Native integrations with enterprise applications',
      technologies: ['Slack API', 'Microsoft Graph', 'Chrome Extension'],
      scalability: 'Multi-tenant',
      throughput: 'Real-time'
    }
  ];

  const deploymentOptions = [
    {
      type: 'private-cloud',
      name: 'Private Cloud (AWS/Azure/GCP)',
      description: 'Dedicated VPC with enterprise security controls',
      benefits: ['Full data control', 'Compliance ready', 'Scalable infrastructure'],
      considerations: ['Higher cost', 'Requires cloud expertise'],
      recommended: true
    },
    {
      type: 'on-premises',
      name: 'On-Premises Deployment',
      description: 'Complete air-gapped deployment in customer datacenter',
      benefits: ['Maximum security', 'No data egress', 'Full control'],
      considerations: ['Hardware requirements', 'Maintenance overhead'],
      recommended: false
    },
    {
      type: 'hybrid',
      name: 'Hybrid Architecture',
      description: 'Sensitive data on-prem, processing in private cloud',
      benefits: ['Balanced approach', 'Flexible scaling', 'Cost optimization'],
      considerations: ['Complex networking', 'Latency considerations'],
      recommended: false
    }
  ];

  const microservices = [
    { service: 'Document Ingestion Service', language: 'Python', database: 'PostgreSQL', scaling: 'Horizontal' },
    { service: 'Content Processing Service', language: 'Python', database: 'Redis', scaling: 'GPU-based' },
    { service: 'Embedding Generation Service', language: 'Python', database: 'Weaviate', scaling: 'Auto' },
    { service: 'Memory Management Service', language: 'Node.js', database: 'PostgreSQL', scaling: 'Horizontal' },
    { service: 'Cognition Engine Service', language: 'Python', database: 'Redis', scaling: 'Auto' },
    { service: 'User Interface Service', language: 'React/Node.js', database: 'PostgreSQL', scaling: 'Load Balanced' },
    { service: 'Integration Gateway Service', language: 'Node.js', database: 'Redis', scaling: 'Horizontal' },
    { service: 'Analytics & Monitoring Service', language: 'Python', database: 'ClickHouse', scaling: 'Horizontal' }
  ];

  const dataFlow = [
    { step: 1, process: 'Document Ingestion', description: 'Multi-source data collection and initial processing', latency: '<1s' },
    { step: 2, process: 'Content Extraction', description: 'Text extraction, cleaning, and metadata enrichment', latency: '2-5s' },
    { step: 3, process: 'Semantic Processing', description: 'LLM-based content analysis and classification', latency: '5-15s' },
    { step: 4, process: 'Embedding Generation', description: 'Vector embedding creation for semantic search', latency: '1-3s' },
    { step: 5, process: 'Memory Creation', description: 'Structured memory object creation with metadata', latency: '<1s' },
    { step: 6, process: 'Human Validation', description: 'SME review and approval workflow', latency: '2-48h' },
    { step: 7, process: 'Index & Activate', description: 'Memory indexing and activation for surfacing', latency: '<1s' },
    { step: 8, process: 'Contextual Surfacing', description: 'Real-time memory surfacing based on user context', latency: '<100ms' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Network className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-slate-900">System Architecture Map</h1>
        </div>
        <p className="text-lg text-slate-600">
          Complete system architecture including microservices, data flows, deployment options, and scalability considerations
        </p>
      </div>

      <Tabs defaultValue="components" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="components">Core Components</TabsTrigger>
          <TabsTrigger value="dataflow">Data Flow</TabsTrigger>
          <TabsTrigger value="microservices">Microservices</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="scalability">Scalability</TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-4 mb-6">
            {architectureComponents.map((component) => {
              const Icon = component.icon;
              return (
                <Card 
                  key={component.id}
                  className={`cursor-pointer transition-all ${selectedComponent === component.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
                  onClick={() => setSelectedComponent(component.id)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-blue-600" />
                      <span>{component.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-xs text-slate-600">{component.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{component.scalability}</Badge>
                        <span className="text-xs text-slate-500">{component.throughput}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="h-5 w-5 text-purple-600" />
                <span>Component Details: {architectureComponents.find(c => c.id === selectedComponent)?.name}</span>
              </CardTitle>
              <CardDescription>
                Technical specifications and implementation details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const component = architectureComponents.find(c => c.id === selectedComponent);
                return component ? (
                  <div className="space-y-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900">Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {component.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Scalability Model</span>
                            <Badge variant="outline" className="text-xs">{component.scalability}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Performance Target</span>
                            <span className="text-sm text-slate-600">{component.throughput}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900">Implementation Details</h4>
                        <div className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs">
                          <pre>{component.id === 'ingestion' ? `# Data Ingestion Pipeline
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ingestion-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ingestion
  template:
    spec:
      containers:
      - name: ingestion
        image: olis/ingestion:latest
        env:
        - name: KAFKA_BROKERS
          value: "kafka:9092"
        - name: REDIS_URL
          value: "redis:6379"
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"` :
component.id === 'processing' ? `# Processing Service Configuration
class ContentProcessor:
    def __init__(self):
        self.llm = OpenAI(model="gpt-4")
        self.embedder = SentenceTransformer(
            'all-MiniLM-L6-v2'
        )
        
    async def process_document(self, doc):
        # Extract and clean content
        content = self.extract_text(doc)
        
        # LLM-based classification
        classification = await self.llm.classify(
            content, 
            categories=ENTERPRISE_CATEGORIES
        )
        
        # Generate embeddings
        embeddings = self.embedder.encode(content)
        
        return ProcessedDocument(
            content=content,
            classification=classification,
            embeddings=embeddings
        )` :
component.id === 'vectorstore' ? `# Vector Store Configuration
version: '3.8'
services:
  weaviate:
    image: semitechnologies/weaviate:latest
    ports:
      - "8080:8080"
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'false'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-openai'
      ENABLE_MODULES: 'text2vec-openai,generative-openai'
      CLUSTER_HOSTNAME: 'node1'
    volumes:
      - weaviate_data:/var/lib/weaviate
    restart: on-failure:0` :
component.id === 'cognition' ? `# Cognition Engine Logic
class CognitionEngine:
    def __init__(self):
        self.context_analyzer = ContextAnalyzer()
        self.memory_ranker = MemoryRanker()
        self.threshold_manager = ThresholdManager()
        
    async def should_surface_memory(
        self, 
        context: UserContext, 
        memory: Memory
    ) -> SurfacingDecision:
        
        # Analyze current context
        context_score = await self.context_analyzer.analyze(
            context
        )
        
        # Calculate memory relevance
        relevance_score = self.memory_ranker.calculate_relevance(
            context, memory
        )
        
        # Get dynamic threshold
        threshold = self.threshold_manager.get_threshold(
            context.user, memory.category
        )
        
        # Make surfacing decision
        final_score = (relevance_score * 0.7) + (context_score * 0.3)
        
        return SurfacingDecision(
            should_surface=final_score >= threshold,
            confidence=final_score,
            reasoning=self._generate_reasoning(context, memory)
        )` :
component.id === 'governance' ? `# Governance Interface Component
const ApprovalQueue = () => {
  const [pendingMemories, setPendingMemories] = useState([]);
  const [selectedMemories, setSelectedMemories] = useState([]);
  
  const handleBulkApproval = async () => {
    const results = await Promise.all(
      selectedMemories.map(memory => 
        approveMemory(memory.id, {
          approver: currentUser.id,
          timestamp: new Date(),
          notes: 'Bulk approval'
        })
      )
    );
    
    // Update UI optimistically
    setPendingMemories(prev => 
      prev.filter(m => !selectedMemories.includes(m))
    );
    
    // Show success notification
    toast.success(\`Approved \${results.length} memories\`);
  };
  
  return (
    <div className="approval-queue">
      <BatchActions 
        selectedCount={selectedMemories.length}
        onBulkApprove={handleBulkApproval}
      />
      <MemoryList 
        memories={pendingMemories}
        onSelectionChange={setSelectedMemories}
      />
    </div>
  );
};` : `# Integration Gateway Service
const IntegrationGateway = {
  slack: new SlackIntegration({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
  }),
  
  outlook: new OutlookIntegration({
    clientId: process.env.OUTLOOK_CLIENT_ID,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET
  }),
  
  chrome: new ChromeExtensionBridge({
    extensionId: process.env.CHROME_EXTENSION_ID
  }),
  
  async handleMemorySurfacing(context, memory) {
    const integration = this.getIntegration(context.platform);
    
    return await integration.surfaceMemory({
      memory,
      context,
      surfacingMethod: this.determineSurfacingMethod(
        context, 
        memory.confidence
      )
    });
  }
};`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dataflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ArrowRight className="h-5 w-5 text-green-600" />
                <span>End-to-End Data Flow</span>
              </CardTitle>
              <CardDescription>
                Complete journey from document ingestion to contextual memory surfacing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-4 gap-4">
                  {dataFlow.slice(0, 4).map((flow, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 font-semibold">
                        {flow.step}
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-2">{flow.process}</h4>
                      <p className="text-xs text-slate-600 mb-2">{flow.description}</p>
                      <Badge variant="outline" className="text-xs">{flow.latency}</Badge>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-slate-400" />
                </div>

                <div className="grid lg:grid-cols-4 gap-4">
                  {dataFlow.slice(4).map((flow, index) => (
                    <div key={index + 4} className="text-center">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 font-semibold">
                        {flow.step}
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-2">{flow.process}</h4>
                      <p className="text-xs text-slate-600 mb-2">{flow.description}</p>
                      <Badge variant="outline" className="text-xs">{flow.latency}</Badge>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Data Flow Architecture</h4>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs">
                    <pre>{`# Data Flow Pipeline Configuration
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  name: olis-data-pipeline
spec:
  entrypoint: process-document
  templates:
  - name: process-document
    dag:
      tasks:
      - name: ingest
        template: document-ingestion
      - name: extract
        template: content-extraction
        dependencies: [ingest]
      - name: process
        template: semantic-processing
        dependencies: [extract]
      - name: embed
        template: embedding-generation
        dependencies: [process]
      - name: create-memory
        template: memory-creation
        dependencies: [embed]
      - name: validate
        template: human-validation
        dependencies: [create-memory]
      - name: activate
        template: memory-activation
        dependencies: [validate]

  - name: document-ingestion
    container:
      image: olis/ingestion:latest
      command: [python, -c]
      args: ["from ingestion import process_document; process_document('{{workflow.parameters.document_url}}')"]

  - name: content-extraction
    container:
      image: olis/extraction:latest
      resources:
        requests:
          memory: 1Gi
          cpu: 500m

  - name: semantic-processing
    container:
      image: olis/processing:latest
      resources:
        requests:
          memory: 2Gi
          cpu: 1000m
          nvidia.com/gpu: 1

  - name: embedding-generation
    container:
      image: olis/embeddings:latest
      resources:
        requests:
          memory: 1Gi
          cpu: 500m

  - name: memory-creation
    container:
      image: olis/memory-service:latest

  - name: human-validation
    suspend: {}  # Wait for human approval

  - name: memory-activation
    container:
      image: olis/activation:latest`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="microservices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="h-5 w-5 text-purple-600" />
                <span>Microservices Architecture</span>
              </CardTitle>
              <CardDescription>
                Distributed services with clear boundaries and responsibilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-slate-300">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="border border-slate-300 px-4 py-2 text-left font-semibold">Service</th>
                        <th className="border border-slate-300 px-4 py-2 text-left font-semibold">Language</th>
                        <th className="border border-slate-300 px-4 py-2 text-left font-semibold">Database</th>
                        <th className="border border-slate-300 px-4 py-2 text-left font-semibold">Scaling</th>
                      </tr>
                    </thead>
                    <tbody>
                      {microservices.map((service, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                          <td className="border border-slate-300 px-4 py-2 font-medium">{service.service}</td>
                          <td className="border border-slate-300 px-4 py-2">
                            <Badge variant="outline" className="text-xs">{service.language}</Badge>
                          </td>
                          <td className="border border-slate-300 px-4 py-2">
                            <Badge variant="secondary" className="text-xs">{service.database}</Badge>
                          </td>
                          <td className="border border-slate-300 px-4 py-2">
                            <Badge variant="default" className="text-xs">{service.scaling}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Service Communication</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h5 className="font-medium text-blue-800 mb-2">Synchronous Communication</h5>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• REST APIs for user-facing operations</li>
                          <li>• gRPC for internal service communication</li>
                          <li>• GraphQL for complex data queries</li>
                        </ul>
                      </div>

                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h5 className="font-medium text-green-800 mb-2">Asynchronous Communication</h5>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Apache Kafka for event streaming</li>
                          <li>• Redis Pub/Sub for real-time updates</li>
                          <li>• Message queues for background processing</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Service Discovery & Mesh</h4>
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs">
                      <pre>{`# Istio Service Mesh Configuration
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: olis-services
spec:
  http:
  - match:
    - uri:
        prefix: /api/v1/memories
    route:
    - destination:
        host: memory-service
        port:
          number: 8080
  - match:
    - uri:
        prefix: /api/v1/cognition
    route:
    - destination:
        host: cognition-service
        port:
          number: 8080
  - match:
    - uri:
        prefix: /api/v1/governance
    route:
    - destination:
        host: governance-service
        port:
          number: 8080`}</pre>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">API Gateway Configuration</h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Shield className="h-6 w-6" />
                        </div>
                        <h5 className="font-semibold text-slate-900 mb-2">Authentication</h5>
                        <p className="text-sm text-slate-600">JWT validation, rate limiting, API key management</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <RefreshCw className="h-6 w-6" />
                        </div>
                        <h5 className="font-semibold text-slate-900 mb-2">Load Balancing</h5>
                        <p className="text-sm text-slate-600">Intelligent routing, health checks, circuit breakers</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Settings className="h-6 w-6" />
                        </div>
                        <h5 className="font-semibold text-slate-900 mb-2">Monitoring</h5>
                        <p className="text-sm text-slate-600">Request tracing, metrics collection, alerting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {deploymentOptions.map((option, index) => (
              <Card key={index} className={`${option.recommended ? 'ring-2 ring-green-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>{option.name}</span>
                    {option.recommended && (
                      <Badge variant="default" className="text-xs bg-green-600">Recommended</Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm">{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-green-800 text-sm mb-1">Benefits</h5>
                      <ul className="text-xs text-green-700 space-y-1">
                        {option.benefits.map((benefit, i) => (
                          <li key={i}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-800 text-sm mb-1">Considerations</h5>
                      <ul className="text-xs text-orange-700 space-y-1">
                        {option.considerations.map((consideration, i) => (
                          <li key={i}>• {consideration}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="h-5 w-5 text-blue-600" />
                <span>Recommended Deployment Architecture</span>
              </CardTitle>
              <CardDescription>
                Private cloud deployment with enterprise security and compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs">
                  <pre>{`# Terraform Infrastructure as Code
# Private VPC with enterprise security controls

resource "aws_vpc" "olis_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "olis-enterprise-vpc"
    Environment = "production"
  }
}

resource "aws_subnet" "private_subnets" {
  count             = 3
  vpc_id            = aws_vpc.olis_vpc.id
  cidr_block        = "10.0.\${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
  
  tags = {
    Name = "olis-private-subnet-\${count.index + 1}"
    Type = "private"
  }
}

resource "aws_eks_cluster" "olis_cluster" {
  name     = "olis-enterprise"
  role_arn = aws_iam_role.cluster_role.arn
  version  = "1.27"

  vpc_config {
    subnet_ids              = aws_subnet.private_subnets[*].id
    endpoint_private_access = true
    endpoint_public_access  = false
    public_access_cidrs     = []
  }

  encryption_config {
    provider {
      key_arn = aws_kms_key.olis_key.arn
    }
    resources = ["secrets"]
  }

  depends_on = [
    aws_iam_role_policy_attachment.cluster_policy,
    aws_iam_role_policy_attachment.vpc_resource_controller,
  ]
}

resource "aws_rds_cluster" "olis_postgres" {
  cluster_identifier      = "olis-postgres"
  engine                 = "aurora-postgresql"
  engine_version         = "13.7"
  database_name          = "olis"
  master_username        = "olis_admin"
  manage_master_user_password = true
  
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.olis_subnet_group.name
  
  backup_retention_period = 30
  preferred_backup_window = "03:00-04:00"
  storage_encrypted      = true
  kms_key_id            = aws_kms_key.olis_key.arn
  
  skip_final_snapshot = false
  final_snapshot_identifier = "olis-final-snapshot-\${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
}

resource "aws_elasticache_replication_group" "olis_redis" {
  replication_group_id       = "olis-redis"
  description               = "Redis cluster for Olis caching"
  
  node_type                 = "cache.r6g.large"
  port                      = 6379
  parameter_group_name      = "default.redis7"
  
  num_cache_clusters        = 3
  automatic_failover_enabled = true
  multi_az_enabled          = true
  
  subnet_group_name = aws_elasticache_subnet_group.olis_cache_subnet.name
  security_group_ids = [aws_security_group.redis_sg.id]
  
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  auth_token                = random_password.redis_auth.result
}`}</pre>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Security Features</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-green-600" />
                        <span className="text-sm">End-to-end encryption</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Private VPC with no internet access</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <span className="text-sm">IAM-based access control</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RefreshCw className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Automated security updates</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Compliance Features</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">SOC 2 Type II</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">HIPAA Compliant</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">GDPR Ready</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">ISO 27001</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scalability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitBranch className="h-5 w-5 text-orange-600" />
                <span>Scalability & Performance</span>
              </CardTitle>
              <CardDescription>
                Horizontal scaling strategies and performance optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Compute Scaling</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h5 className="font-medium text-blue-800 mb-1">Kubernetes HPA</h5>
                        <p className="text-sm text-blue-700">Auto-scaling based on CPU, memory, and custom metrics</p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h5 className="font-medium text-green-800 mb-1">GPU Auto-scaling</h5>
                        <p className="text-sm text-green-700">Dynamic GPU allocation for LLM processing workloads</p>
                      </div>
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <h5 className="font-medium text-purple-800 mb-1">Spot Instances</h5>
                        <p className="text-sm text-purple-700">Cost optimization for batch processing tasks</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Data Scaling</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <h5 className="font-medium text-orange-800 mb-1">Database Sharding</h5>
                        <p className="text-sm text-orange-700">Horizontal partitioning by tenant and department</p>
                      </div>
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <h5 className="font-medium text-red-800 mb-1">Vector DB Clustering</h5>
                        <p className="text-sm text-red-700">Distributed vector search across multiple nodes</p>
                      </div>
                      <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <h5 className="font-medium text-indigo-800 mb-1">Caching Layers</h5>
                        <p className="text-sm text-indigo-700">Multi-tier caching with Redis and CDN</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Performance Targets</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <span className="text-sm font-medium">Memory Surfacing</span>
                        <Badge variant="default" className="text-xs">&lt;100ms</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <span className="text-sm font-medium">Search Queries</span>
                        <Badge variant="default" className="text-xs">&lt;200ms</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <span className="text-sm font-medium">Document Processing</span>
                        <Badge variant="default" className="text-xs">&lt;30s</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <span className="text-sm font-medium">Concurrent Users</span>
                        <Badge variant="default" className="text-xs">10K+</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Auto-scaling Configuration</h4>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs">
                    <pre>{`# Kubernetes Horizontal Pod Autoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: olis-cognition-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cognition-service
  minReplicas: 3
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  - type: Pods
    pods:
      metric:
        name: memory_surfacing_requests_per_second
      target:
        type: AverageValue
        averageValue: "100"
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60

---
# Vertical Pod Autoscaler for GPU workloads
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: olis-processing-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: processing-service
  updatePolicy:
    updateMode: "Auto"
  resourcePolicy:
    containerPolicies:
    - containerName: processing
      maxAllowed:
        cpu: 4
        memory: 8Gi
        nvidia.com/gpu: 2
      minAllowed:
        cpu: 500m
        memory: 1Gi
        nvidia.com/gpu: 1`}</pre>
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