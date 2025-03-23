"use client";

import React, { useState } from "react";
import { 
  ScrollText, 
  BookOpen, 
  Calendar, 
  Filter, 
  Brain,
  Heart,
  ArrowUpRight,
  Search
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface ResearchPaper {
  paperId: string;
  title: string;
  abstract?: string;
  venue?: string;
  year?: number;
  authors?: {
    authorId: string;
    name: string;
  }[];
  tldr?: {
    text: string;
  };
  openAccessPdf?: {
    url: string;
  };
}

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [additionalPapers, setAdditionalPapers] = useState<ResearchPaper[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);

  const searchPapers = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setShowNoResults(false);
    try {
      const params = new URLSearchParams({
        query: searchQuery,
        limit: "5",
        fields: "title,abstract,venue,year,authors,tldr,openAccessPdf",
        fieldsOfStudy: "Neuroscience,Medicine,Psychology"
      });

      const response = await fetch(`https://api.semanticscholar.org/graph/v1/paper/search?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Semantic Scholar API error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setAdditionalPapers(data.data);
      } else {
        setShowNoResults(true);
      }
    } catch (error) {
      console.error("Error searching papers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePapers = async () => {
    setIsLoading(true);
    try {
      // Default query for brain health research if no user query
      const query = "brain health cognitive training stroke prevention";
      const params = new URLSearchParams({
        query,
        limit: "5",
        fields: "title,abstract,venue,year,authors,tldr,openAccessPdf",
        fieldsOfStudy: "Neuroscience,Medicine,Psychology"
      });

      const response = await fetch(`https://api.semanticscholar.org/graph/v1/paper/search?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Semantic Scholar API error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setAdditionalPapers(data.data);
      }
    } catch (error) {
      console.error("Error loading more papers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8 px-4 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Research & Studies
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl">
            Explore the latest peer-reviewed research on brain health, stroke prevention, and cognitive enhancement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for research papers..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchPapers()}
            />
          </div>
          <Button onClick={searchPapers} disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            
            <Badge variant="outline" className="hover:bg-secondary transition-colors cursor-pointer">Brain Health</Badge>
            <Badge variant="outline" className="hover:bg-secondary transition-colors cursor-pointer">Stroke</Badge>
            <Badge variant="outline" className="hover:bg-secondary transition-colors cursor-pointer">Cognition</Badge>
            <Badge variant="outline" className="hover:bg-secondary transition-colors cursor-pointer">Aging</Badge>
            <Badge variant="outline" className="hover:bg-secondary transition-colors cursor-pointer">Prevention</Badge>
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Sort by Date</span>
          </Button>
        </div>

        <Tabs defaultValue="latest" className="w-full">
          <TabsList className="w-full overflow-x-auto pb-2 scrollbar-hide">
            <TabsTrigger value="latest" className="flex items-center gap-1 text-xs sm:text-sm flex-shrink-0">
              <ScrollText className="h-4 w-4" />
              <span>Latest Studies</span>
            </TabsTrigger>
            <TabsTrigger value="brain" className="flex items-center gap-1 text-xs sm:text-sm flex-shrink-0">
              <Brain className="h-4 w-4" />
              <span>Brain Health</span>
            </TabsTrigger>
            <TabsTrigger value="stroke" className="flex items-center gap-1 text-xs sm:text-sm flex-shrink-0">
              <Heart className="h-4 w-4" />
              <span>Stroke Research</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-1 text-xs sm:text-sm flex-shrink-0">
              <BookOpen className="h-4 w-4" />
              <span>Educational Resources</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="latest" className="space-y-6 mt-6">
            {searchQuery && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Search Results for &quot;{searchQuery}&quot;</h3>
                {showNoResults && (
                  <div className="text-center py-10 bg-muted/30 rounded-lg">
                    <p>No research papers found matching your search. Try different keywords.</p>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6">
              {!searchQuery && (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">Lifestyle Modifications for Stroke Prevention: A Comprehensive Review</CardTitle>
                          <CardDescription>Published in Stroke Prevention Journal, June 2023</CardDescription>
                        </div>
                        <Badge>Stroke</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        This meta-analysis of 42 studies examined the efficacy of various lifestyle modifications in preventing first-time and recurrent strokes. Results showed that a combination of regular physical activity, Mediterranean diet, smoking cessation, and moderate alcohol consumption reduced stroke risk by up to 50% compared to individuals with high-risk lifestyle factors.
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Key Findings:</span>
                          <Badge variant="outline">50% risk reduction</Badge>
                          <Badge variant="outline">Physical activity</Badge>
                          <Badge variant="outline">Diet</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Authors:</span>
                          <span className="text-muted-foreground">Williams J, Chen H, Smith K, et al.</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">Read Abstract</Button>
                      <Button variant="link" size="sm" className="flex items-center gap-1" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          View Full Paper <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">Cognitive Training Efficacy in Older Adults: A Randomized Controlled Trial</CardTitle>
                          <CardDescription>Published in Journal of Cognitive Enhancement, April 2023</CardDescription>
                        </div>
                        <Badge>Cognition</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        This 12-month randomized controlled trial with 320 older adults (65+ years) evaluated the efficacy of digital cognitive training programs across various cognitive domains. Participants who completed at least 20 minutes of training three times weekly showed significant improvements in processing speed, attention, and working memory compared to controls. Benefits were maintained at 6-month follow-up.
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Key Findings:</span>
                          <Badge variant="outline">Processing speed</Badge>
                          <Badge variant="outline">Working memory</Badge>
                          <Badge variant="outline">Sustained benefits</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Authors:</span>
                          <span className="text-muted-foreground">Rodriguez M, Kumar A, Thompson P, et al.</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">Read Abstract</Button>
                      <Button variant="link" size="sm" className="flex items-center gap-1" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          View Full Paper <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">Sleep Quality and Cognitive Function: A Longitudinal Study</CardTitle>
                          <CardDescription>Published in Sleep Medicine, March 2023</CardDescription>
                        </div>
                        <Badge>Brain Health</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        This 5-year longitudinal study followed 1,200 adults aged 40-70 to examine the relationship between sleep quality and cognitive function. Participants with consistent poor sleep quality (defined as &lt;6 hours nightly or frequent interruptions) showed accelerated cognitive decline compared to those with healthy sleep patterns. The study found that improving sleep quality through behavioral interventions mitigated cognitive decline.
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Key Findings:</span>
                          <Badge variant="outline">Sleep quality</Badge>
                          <Badge variant="outline">Cognitive decline</Badge>
                          <Badge variant="outline">Behavior interventions</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Authors:</span>
                          <span className="text-muted-foreground">Li Y, Peterson N, Garcia J, et al.</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">Read Abstract</Button>
                      <Button variant="link" size="sm" className="flex items-center gap-1" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          View Full Paper <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </>
              )}

              {additionalPapers.map((paper) => (
                <Card key={paper.paperId}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{paper.title}</CardTitle>
                        <CardDescription>
                          {paper.venue ? `Published in ${paper.venue}` : ''} 
                          {paper.year ? `, ${paper.year}` : ''}
                        </CardDescription>
                      </div>
                      <Badge>{paper.year ? paper.year : 'Research'}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      {paper.abstract || (paper.tldr?.text) || 'No abstract available.'}
                    </p>
                    <div className="mt-4 space-y-2">
                      {paper.tldr && paper.abstract && (
                        <div className="flex items-start gap-2 text-sm">
                          <span className="font-medium">TL;DR:</span>
                          <p className="text-muted-foreground">{paper.tldr.text}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Authors:</span>
                        <span className="text-muted-foreground">
                          {paper.authors?.map(author => author.name).join(', ') || 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">Read Abstract</Button>
                    {paper.openAccessPdf ? (
                      <Button variant="link" size="sm" className="flex items-center gap-1" asChild>
                        <a href={paper.openAccessPdf.url} target="_blank" rel="noopener noreferrer">
                          View Full Paper <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </Button>
                    ) : (
                      <Button variant="link" size="sm" className="flex items-center gap-1" asChild>
                        <a href={`https://www.semanticscholar.org/paper/${paper.paperId}`} target="_blank" rel="noopener noreferrer">
                          View on Semantic Scholar <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center pt-4">
              <Button onClick={loadMorePapers} disabled={isLoading}>
                {isLoading ? "Loading..." : "Load More Studies"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="brain" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Brain Health Research</CardTitle>
                <CardDescription>Latest findings on maintaining and improving cognitive function</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="flex-1">
                      <h4 className="text-base font-medium">Neuroplasticity in Aging: A Systematic Review</h4>
                      <p className="text-sm text-muted-foreground mt-1">This review of 78 studies demonstrates that neuroplasticity persists into older age, with evidence that cognitive training, physical exercise, and social engagement promote neural adaptation.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">Neuroplasticity</Badge>
                        <Badge variant="outline">Aging</Badge>
                        <Badge variant="outline">Intervention</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                  
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="flex-1">
                      <h4 className="text-base font-medium">Nutrition and Brain Function: The Mediterranean-DASH Diet</h4>
                      <p className="text-sm text-muted-foreground mt-1">A 4-year prospective study showing that adherence to the Mediterranean-DASH diet was associated with slower cognitive decline and reduced risk of Alzheimer&apos;s disease.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">Nutrition</Badge>
                        <Badge variant="outline">Cognitive decline</Badge>
                        <Badge variant="outline">Mediterranean diet</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                  
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="flex-1">
                      <h4 className="text-base font-medium">Physical Exercise and Hippocampal Neurogenesis</h4>
                      <p className="text-sm text-muted-foreground mt-1">Randomized controlled trial demonstrating that aerobic exercise increases hippocampal volume and improves memory function in adults aged 55-80.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">Exercise</Badge>
                        <Badge variant="outline">Hippocampus</Badge>
                        <Badge variant="outline">Memory</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h4 className="text-base font-medium">Digital Cognitive Training Efficacy Comparison</h4>
                      <p className="text-sm text-muted-foreground mt-1">Comparative analysis of different digital cognitive training programs showing domain-specific improvements with transfer effects varying across age groups and training intensity.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">Cognitive training</Badge>
                        <Badge variant="outline">Transfer effects</Badge>
                        <Badge variant="outline">Digital health</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stroke" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Stroke Research</CardTitle>
                <CardDescription>Latest findings on stroke prevention, recovery, and treatment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="flex-1">
                      <h4 className="text-base font-medium">Early Detection Biomarkers for Stroke Risk</h4>
                      <p className="text-sm text-muted-foreground mt-1">This prospective cohort study identified novel blood biomarkers that may predict stroke risk up to 5 years before clinical events, potentially enabling earlier preventive interventions.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">Biomarkers</Badge>
                        <Badge variant="outline">Risk prediction</Badge>
                        <Badge variant="outline">Prevention</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                  
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="flex-1">
                      <h4 className="text-base font-medium">Blood Pressure Variability and Stroke Risk</h4>
                      <p className="text-sm text-muted-foreground mt-1">Analysis of 15,000 patients showing that visit-to-visit blood pressure variability independently predicts stroke risk beyond average blood pressure measurements.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">Blood pressure</Badge>
                        <Badge variant="outline">Variability</Badge>
                        <Badge variant="outline">Risk assessment</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                  
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="flex-1">
                      <h4 className="text-base font-medium">Cognitive Rehabilitation After Stroke</h4>
                      <p className="text-sm text-muted-foreground mt-1">Randomized trial demonstrating that intensive cognitive rehabilitation started within 3 months of stroke significantly improved cognitive recovery and functional independence.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">Rehabilitation</Badge>
                        <Badge variant="outline">Recovery</Badge>
                        <Badge variant="outline">Cognition</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h4 className="text-base font-medium">Genetic Risk Factors for Early-Onset Stroke</h4>
                      <p className="text-sm text-muted-foreground mt-1">Genome-wide association study identifying novel genetic variants associated with increased risk of stroke before age 55, with implications for targeted screening.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">Genetics</Badge>
                        <Badge variant="outline">Early-onset</Badge>
                        <Badge variant="outline">Risk screening</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="micro-bounce w-full" asChild>
                  <Link href="/stroke-prevention">
                    View Stroke Prevention Strategies
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Educational Resources</CardTitle>
                <CardDescription>Access educational materials on brain health and stroke prevention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Patient Education Materials</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <p className="text-sm">Downloadable guides and factsheets about brain health, stroke prevention, and cognitive enhancement.</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Understanding Stroke Risk Factors</li>
                        <li>Brain-Healthy Diet Guide</li>
                        <li>Exercise for Brain Health</li>
                        <li>Cognitive Training at Home</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">Access Resources</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Webinars & Presentations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <p className="text-sm">Expert presentations on the latest research findings and implications for brain health practice.</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Latest Advances in Stroke Prevention</li>
                        <li>Cognitive Training Efficacy</li>
                        <li>Brain Health Across the Lifespan</li>
                        <li>Nutrition and Brain Function</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">View Webinars</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground mb-4">Want to stay updated with the latest research?</p>
              <Button size="lg" className="micro-bounce">
                Subscribe to Research Updates
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 