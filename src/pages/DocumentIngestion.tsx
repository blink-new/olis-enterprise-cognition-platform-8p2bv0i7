import React, { useState, useCallback, useRef, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Zap,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Edit3,
  Trash2,
  Filter,
  Search,
  Download,
  RefreshCw,
  Building,
  Users,
  Shield,
  Gavel,
  Settings,
  Mail,
  MessageSquare,
  Chrome,
  FileCheck,
  Target,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  status: 'uploading' | 'processing' | 'classifying' | 'extracting' | 'validating' | 'approved' | 'rejected';
  progress: number;
  classification?: {
    domain: string;
    subdomain: string;
    type: 'Policy' | 'SOP' | 'Approval Flow' | 'Decision Rationale' | 'Internal Guidance';
    confidence: number;
  };
  memoryUnits?: MemoryUnit[];
}

interface MemoryUnit {
  id: string;
  question: string;
  answer: string;
  sourceSnippet: string;
  confidence: number;
  tags: string[];
  approver?: string;
  status: 'pending' | 'approved' | 'rejected' | 'edited';
  department: string;
  accessLevel: 'public' | 'department' | 'restricted';
  validUntil?: Date;
}

interface SurfacingExample {
  context: string;
  platform: 'email' | 'slack' | 'form';
  trigger: string;
  suggestion: string;
  confidence: number;
}

export default function DocumentIngestion() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [filter, setFilter] = useState('all');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Mock data for demonstration
  const mockMemoryUnits = useMemo<MemoryUnit[]>(() => [
    {
      id: 'mem-1',
      question: 'How do I onboard a new vendor?',
      answer: 'Submit a vendor onboarding request through the procurement portal. Legal and privacy reviews are required before IT provisioning.',
      sourceSnippet: 'All vendor onboarding requests must be submitted through the official procurement portal and require approval from Legal (privacy assessment) and IT (security review) before final provisioning.',
      confidence: 0.92,
      tags: ['procurement', 'vendor', 'onboarding', 'legal', 'privacy'],
      status: 'pending',
      department: 'Procurement',
      accessLevel: 'department',
      validUntil: new Date('2025-12-31')
    },
    {
      id: 'mem-2',
      question: 'Who approves privacy assessments for vendors?',
      answer: 'Privacy assessments are approved by the Head of Legal or designated privacy officer.',
      sourceSnippet: 'Privacy assessments for all third-party vendors must be reviewed and approved by the Head of Legal or their designated privacy officer within 5 business days.',
      confidence: 0.88,
      tags: ['privacy', 'legal', 'approval', 'vendor'],
      status: 'pending',
      department: 'Legal',
      accessLevel: 'public',
      validUntil: new Date('2025-12-31')
    },
    {
      id: 'mem-3',
      question: 'Where is the vendor contract template located?',
      answer: 'Standard vendor contract templates are available in the Legal SharePoint under Templates > Vendor Agreements.',
      sourceSnippet: 'Standard contract templates for vendor agreements can be found in the Legal department SharePoint site under the Templates folder, specifically in the Vendor Agreements subfolder.',
      confidence: 0.95,
      tags: ['contract', 'template', 'legal', 'sharepoint'],
      status: 'pending',
      department: 'Legal',
      accessLevel: 'department'
    }
  ], []);

  const mockSurfacingExamples: SurfacingExample[] = [
    {
      context: 'Composing email about vendor access',
      platform: 'email',
      trigger: 'Hi, can you share how I get vendor access?',
      suggestion: 'To onboard a vendor, submit a request to Procurement. Legal & Privacy approvals are required. See full doc →',
      confidence: 0.92
    },
    {
      context: 'Slack conversation about contracts',
      platform: 'slack',
      trigger: 'Where do I find the vendor contract template?',
      suggestion: 'Standard vendor contract templates are in Legal SharePoint > Templates > Vendor Agreements',
      confidence: 0.95
    },
    {
      context: 'Filling procurement form',
      platform: 'form',
      trigger: 'Privacy assessment field',
      suggestion: 'Privacy assessments are approved by Head of Legal (typically 5 business days)',
      confidence: 0.88
    }
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const simulateDocumentProcessing = useCallback(async (docId: string) => {
    const stages = [
      { status: 'uploading' as const, duration: 1000, progress: 20 },
      { status: 'processing' as const, duration: 2000, progress: 40 },
      { status: 'classifying' as const, duration: 3000, progress: 60 },
      { status: 'extracting' as const, duration: 2000, progress: 80 },
      { status: 'validating' as const, duration: 1000, progress: 100 }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, stage.duration));
      
      setDocuments(prev => prev.map(doc => 
        doc.id === docId 
          ? { 
              ...doc, 
              status: stage.status, 
              progress: stage.progress,
              ...(stage.status === 'validating' ? {
                classification: {
                  domain: 'Procurement',
                  subdomain: 'Vendor Onboarding',
                  type: 'Policy' as const,
                  confidence: 0.92
                },
                memoryUnits: mockMemoryUnits
              } : {})
            }
          : doc
      ));
    }
  }, [mockMemoryUnits]);

  const handleFiles = useCallback((files: File[]) => {
    files.forEach((file) => {
      const newDoc: Document = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        uploadedAt: new Date(),
        status: 'uploading',
        progress: 0
      };

      setDocuments(prev => [...prev, newDoc]);

      // Simulate document processing pipeline
      simulateDocumentProcessing(newDoc.id);
    });

    toast({
      title: "Documents uploaded",
      description: `${files.length} document(s) are being processed`,
    });
  }, [simulateDocumentProcessing, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, [handleFiles]);

  const handleMemoryAction = (memoryId: string, action: 'approve' | 'reject' | 'edit') => {
    setDocuments(prev => prev.map(doc => ({
      ...doc,
      memoryUnits: doc.memoryUnits?.map(unit => 
        unit.id === memoryId 
          ? { ...unit, status: action === 'edit' ? 'edited' : action === 'approve' ? 'approved' : 'rejected' }
          : unit
      )
    })));

    toast({
      title: `Memory ${action}d`,
      description: `Memory unit has been ${action}d successfully`,
    });
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'uploading': return <Upload className="h-4 w-4 text-blue-500" />;
      case 'processing': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'classifying': return <Brain className="h-4 w-4 text-purple-500" />;
      case 'extracting': return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'validating': return <Eye className="h-4 w-4 text-orange-500" />;
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'uploading': return 'Uploading...';
      case 'processing': return 'Processing content...';
      case 'classifying': return 'Classifying & mapping...';
      case 'extracting': return 'Extracting memory units...';
      case 'validating': return 'Ready for validation';
      case 'approved': return 'Approved & active';
      case 'rejected': return 'Rejected';
      default: return 'Unknown status';
    }
  };

  const getDomainIcon = (domain: string) => {
    switch (domain.toLowerCase()) {
      case 'procurement': return <Building className="h-4 w-4 text-blue-600" />;
      case 'legal': return <Gavel className="h-4 w-4 text-purple-600" />;
      case 'it': return <Settings className="h-4 w-4 text-green-600" />;
      case 'hr': return <Users className="h-4 w-4 text-orange-600" />;
      case 'security': return <Shield className="h-4 w-4 text-red-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPlatformIcon = (platform: SurfacingExample['platform']) => {
    switch (platform) {
      case 'email': return <Mail className="h-4 w-4 text-blue-500" />;
      case 'slack': return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'form': return <FileCheck className="h-4 w-4 text-green-500" />;
      default: return <Chrome className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    if (filter === 'all') return true;
    return doc.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Upload className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-slate-900">Document Ingestion & Memory Formation</h1>
        </div>
        <p className="text-lg text-slate-600">
          Transform enterprise documents into structured, contextual memory that surfaces intelligently across your workflow
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload & Process</TabsTrigger>
          <TabsTrigger value="validation">Memory Validation</TabsTrigger>
          <TabsTrigger value="surfacing">Ambient Surfacing</TabsTrigger>
          <TabsTrigger value="analytics">Growth Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Upload Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-blue-600" />
                <span>Document Upload Interface</span>
              </CardTitle>
              <CardDescription>
                Drag and drop documents to begin the memory formation process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-300 hover:border-slate-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Drop documents here or click to upload
                </h3>
                <p className="text-slate-600 mb-4">
                  Supports PDFs, Word docs, emails, policies, SOPs, and more
                </p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-4"
                >
                  Choose Files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                  accept=".pdf,.doc,.docx,.txt,.md,.eml"
                />
                <div className="text-sm text-slate-500">
                  <p>Supported sources: Local files, Google Drive, SharePoint, Confluence</p>
                  <p>Batch uploads supported • Automatic metadata detection</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Processing Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span>Processing Pipeline</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Real-time document processing with automatic classification and memory extraction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p>No documents uploaded yet. Drop some files above to get started!</p>
                  </div>
                ) : (
                  filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-blue-500" />
                            <div>
                              <h4 className="font-semibold text-slate-900">{doc.name}</h4>
                              <p className="text-sm text-slate-500">
                                {(doc.size / 1024 / 1024).toFixed(2)} MB • {doc.uploadedAt.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(doc.status)}
                            <span className="text-sm font-medium">{getStatusText(doc.status)}</span>
                          </div>
                        </div>

                        <Progress value={doc.progress} className="mb-3" />

                        {doc.classification && (
                          <div className="bg-slate-50 rounded-lg p-3 mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-semibold text-slate-900 flex items-center space-x-2">
                                {getDomainIcon(doc.classification.domain)}
                                <span>Classification Results</span>
                              </h5>
                              <Badge variant="secondary" className="text-xs">
                                {(doc.classification.confidence * 100).toFixed(0)}% confidence
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-slate-700">Domain:</span>
                                <span className="ml-2 text-slate-600">{doc.classification.domain}</span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700">Subdomain:</span>
                                <span className="ml-2 text-slate-600">{doc.classification.subdomain}</span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700">Type:</span>
                                <span className="ml-2 text-slate-600">{doc.classification.type}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {doc.memoryUnits && doc.memoryUnits.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="font-semibold text-slate-900 flex items-center space-x-2">
                              <Zap className="h-4 w-4 text-yellow-500" />
                              <span>Extracted Memory Units ({doc.memoryUnits.length})</span>
                            </h5>
                            <div className="text-sm text-slate-600 mb-2">
                              Ready for validation • Click to review individual memory units
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedDocument(doc);
                                setActiveTab('validation');
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Review Memory Units
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-orange-600" />
                <span>Human-in-the-Loop Validation</span>
              </CardTitle>
              <CardDescription>
                Review and approve memory units before they become active in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDocument?.memoryUnits ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {selectedDocument.name}
                      </h3>
                      <p className="text-slate-600">
                        {selectedDocument.memoryUnits.length} memory units extracted
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve All
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedDocument.memoryUnits.map((unit) => (
                      <Card key={unit.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 mb-2">
                                  {unit.question}
                                </h4>
                                <p className="text-slate-700 mb-3">
                                  {unit.answer}
                                </p>
                                <div className="bg-slate-50 p-3 rounded-lg mb-3">
                                  <h5 className="font-medium text-slate-800 mb-1">Source Context</h5>
                                  <p className="text-sm text-slate-600 italic">
                                    "{unit.sourceSnippet}"
                                  </p>
                                </div>
                              </div>
                              <div className="ml-4 flex flex-col items-end space-y-2">
                                <Badge variant="secondary" className="text-xs">
                                  {(unit.confidence * 100).toFixed(0)}% confidence
                                </Badge>
                                <Badge 
                                  variant={
                                    unit.status === 'approved' ? 'default' :
                                    unit.status === 'rejected' ? 'destructive' :
                                    unit.status === 'edited' ? 'secondary' : 'outline'
                                  }
                                  className="text-xs"
                                >
                                  {unit.status}
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-slate-700">Department:</span>
                                <span className="ml-2 text-slate-600">{unit.department}</span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700">Access Level:</span>
                                <Badge variant="outline" className="ml-2 text-xs">
                                  {unit.accessLevel}
                                </Badge>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700">Valid Until:</span>
                                <span className="ml-2 text-slate-600">
                                  {unit.validUntil?.toLocaleDateString() || 'No expiry'}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700">Tags:</span>
                                <div className="ml-2 flex flex-wrap gap-1">
                                  {unit.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleMemoryAction(unit.id, 'approve')}
                                  disabled={unit.status === 'approved'}
                                >
                                  <ThumbsUp className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleMemoryAction(unit.id, 'edit')}
                                >
                                  <Edit3 className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleMemoryAction(unit.id, 'reject')}
                                  disabled={unit.status === 'rejected'}
                                >
                                  <ThumbsDown className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Eye className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p>No document selected for validation.</p>
                  <p className="text-sm">Upload and process documents first, then return here to validate memory units.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="surfacing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>Ambient Memory Surfacing</span>
              </CardTitle>
              <CardDescription>
                See how approved memories surface contextually across different platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-slate-900">Email Integration</h4>
                    <p className="text-sm text-slate-600">Outlook sidebar & inline suggestions</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-slate-900">Slack Integration</h4>
                    <p className="text-sm text-slate-600">Slash commands & passive triggers</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Chrome className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-slate-900">Browser Extension</h4>
                    <p className="text-sm text-slate-600">Internal tools overlay</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Live Surfacing Examples</h4>
                  {mockSurfacingExamples.map((example, index) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {getPlatformIcon(example.platform)}
                            <span className="font-medium text-slate-900 capitalize">
                              {example.platform}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {example.context}
                            </Badge>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {(example.confidence * 100).toFixed(0)}% confidence
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-slate-50 p-3 rounded-lg">
                            <h5 className="font-medium text-slate-800 mb-1">User Input</h5>
                            <p className="text-sm text-slate-600 italic">
                              "{example.trigger}"
                            </p>
                          </div>

                          <div className="flex items-center">
                            <ArrowRight className="h-4 w-4 text-slate-400 mx-2" />
                          </div>

                          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <h5 className="font-medium text-green-800 mb-1">Olis Suggestion</h5>
                            <p className="text-sm text-green-700">
                              {example.suggestion}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Surfacing Logic Configuration</h4>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs">
                    <pre>{`# Contextual Surfacing Engine
class ContextualSurfacing:
    def __init__(self):
        self.context_analyzer = ContextAnalyzer()
        self.memory_matcher = SemanticMatcher()
        self.confidence_threshold = 0.8
        
    async def should_surface_memory(self, context, user_input):
        # Analyze current context
        context_signals = self.context_analyzer.extract_signals(context)
        
        # Find matching memories
        candidate_memories = await self.memory_matcher.find_matches(
            user_input, 
            context_signals,
            user_permissions=context.user.permissions
        )
        
        # Apply confidence filtering
        high_confidence_memories = [
            memory for memory in candidate_memories 
            if memory.confidence >= self.confidence_threshold
        ]
        
        # Select best match
        if high_confidence_memories:
            best_match = max(high_confidence_memories, key=lambda m: m.confidence)
            
            return SurfacingDecision(
                should_surface=True,
                memory=best_match,
                surfacing_method=self.determine_surfacing_method(context),
                confidence=best_match.confidence
            )
        
        return SurfacingDecision(should_surface=False)
    
    def determine_surfacing_method(self, context):
        if context.platform == 'email':
            return 'inline_suggestion'
        elif context.platform == 'slack':
            return 'bot_mention'
        elif context.platform == 'form':
            return 'field_tooltip'
        else:
            return 'overlay_popup'`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <span>Growth Analytics & Feedback Loop</span>
              </CardTitle>
              <CardDescription>
                Track system performance and continuous improvement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">1,247</div>
                    <div className="text-sm text-slate-600">Documents Processed</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">3,891</div>
                    <div className="text-sm text-slate-600">Memory Units Created</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">92%</div>
                    <div className="text-sm text-slate-600">Approval Rate</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-1">15,432</div>
                    <div className="text-sm text-slate-600">Successful Surfacings</div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Memory Quality Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Classification Accuracy</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={94} className="w-20" />
                            <span className="text-sm font-medium">94%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Memory Relevance</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={89} className="w-20" />
                            <span className="text-sm font-medium">89%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">User Satisfaction</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={91} className="w-20" />
                            <span className="text-sm font-medium">91%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Surfacing Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Response Time</span>
                          <span className="text-sm font-medium text-green-600">&lt;100ms</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Success Rate</span>
                          <span className="text-sm font-medium text-green-600">96.2%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">User Engagement</span>
                          <span className="text-sm font-medium text-blue-600">78%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Continuous Learning Loop</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid lg:grid-cols-3 gap-4">
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <h5 className="font-medium text-blue-800 mb-2">Document Feedback</h5>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Classification corrections</li>
                            <li>• Memory unit refinements</li>
                            <li>• Relevance scoring updates</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <h5 className="font-medium text-green-800 mb-2">Usage Patterns</h5>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Surfacing effectiveness</li>
                            <li>• User interaction data</li>
                            <li>• Context optimization</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <h5 className="font-medium text-purple-800 mb-2">System Evolution</h5>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Model improvements</li>
                            <li>• New domain detection</li>
                            <li>• Process optimization</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-slate-900 mb-2">Recent System Improvements</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Improved procurement domain classification accuracy by 12%</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Added support for email thread context analysis</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Reduced false positive surfacing by 8%</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span>Training new legal document patterns (in progress)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}