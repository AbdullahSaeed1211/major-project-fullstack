"use client";

import React, { useState } from "react";
import { 
  ScrollText, 
  Calendar, 
  Filter, 
  Brain,
  Heart,
  ArrowUpRight,
  Search,
  BookOpen,
  FileText,
  Video,
  Download
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

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

  const handleSortToggle = () => {
    setSortOrder(prevOrder => prevOrder === "newest" ? "oldest" : "newest");
  };

  const sortedPapers = [...additionalPapers].sort((a, b) => {
    const yearA = a.year || 0;
    const yearB = b.year || 0;
    return sortOrder === "newest" ? yearB - yearA : yearA - yearB;
  });

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
              className="pl-9 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchPapers()}
            />
          </div>
          <Button onClick={searchPapers} disabled={isLoading} className="text-base">
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-sm">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            
            <Badge variant="outline" className="hover:bg-secondary transition-colors cursor-pointer text-sm">Brain Health</Badge>
            <Badge variant="outline" className="hover:bg-secondary transition-colors cursor-pointer text-sm">Stroke</Badge>
            <Badge variant="outline" className="hover:bg-secondary transition-colors cursor-pointer text-sm">Cognition</Badge>
            <Badge variant="outline" className="hover:bg-secondary transition-colors cursor-pointer text-sm">Aging</Badge>
            <Badge variant="outline" className="hover:bg-secondary transition-colors cursor-pointer text-sm">Prevention</Badge>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 text-sm"
            onClick={handleSortToggle}
          >
            <Calendar className="h-4 w-4" />
            <span>Sort by {sortOrder === "newest" ? "Newest" : "Oldest"}</span>
          </Button>
        </div>

        <Tabs defaultValue="latest" className="w-full">
          <TabsList className="w-full overflow-x-auto pb-2 scrollbar-hide">
            <TabsTrigger value="latest" className="flex items-center gap-1 text-sm flex-shrink-0">
              <ScrollText className="h-4 w-4" />
              <span>Latest Studies</span>
            </TabsTrigger>
            <TabsTrigger value="brain" className="flex items-center gap-1 text-sm flex-shrink-0">
              <Brain className="h-4 w-4" />
              <span>Brain Health</span>
            </TabsTrigger>
            <TabsTrigger value="stroke" className="flex items-center gap-1 text-sm flex-shrink-0">
              <Heart className="h-4 w-4" />
              <span>Stroke Research</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-1 text-sm flex-shrink-0">
              <BookOpen className="h-4 w-4" />
              <span>Resources</span>
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

            {!searchQuery && additionalPapers.length === 0 ? (
              <div className="text-center py-10 bg-muted/30 rounded-lg">
                <p className="text-lg font-medium mb-2">Loading Research Papers</p>
                <p className="text-muted-foreground">Please wait while we fetch the latest research or use the search function above.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={loadMorePapers}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load Research Papers"}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {searchQuery ? (
                  sortedPapers.length > 0 ? (
                    sortedPapers.map((paper) => (
                      <Card key={paper.paperId}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-xl">{paper.title}</CardTitle>
                              <CardDescription>
                                {paper.venue ? `Published in ${paper.venue}` : ""}
                                {paper.year ? `, ${paper.year}` : ""}
                              </CardDescription>
                            </div>
                            <Badge>Research</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            {paper.abstract ? paper.abstract.substring(0, 300) + (paper.abstract.length > 300 ? "..." : "") : 
                             paper.tldr?.text ? paper.tldr.text : "No abstract available."}
                          </p>
                          <div className="mt-4 space-y-2">
                            {paper.authors && paper.authors.length > 0 && (
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">Authors:</span>
                                <span className="text-muted-foreground">
                                  {paper.authors.map(a => a.name).join(", ")}
                                </span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">Read Abstract</Button>
                          {paper.openAccessPdf?.url && (
                            <Button variant="link" size="sm" className="flex items-center gap-1" asChild>
                              <a href={paper.openAccessPdf.url} target="_blank" rel="noopener noreferrer">
                                View Full Paper <ArrowUpRight className="h-3 w-3" />
                              </a>
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    showNoResults && (
                      <div className="text-center py-10 bg-muted/30 rounded-lg">
                        <p>No research papers found matching your search. Try different keywords.</p>
                      </div>
                    )
                  )
                ) : (
                  sortedPapers.length > 0 ? (
                    sortedPapers.map((paper) => (
                      <Card key={paper.paperId}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-xl">{paper.title}</CardTitle>
                              <CardDescription>
                                {paper.venue ? `Published in ${paper.venue}` : ""}
                                {paper.year ? `, ${paper.year}` : ""}
                              </CardDescription>
                            </div>
                            <Badge>Research</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            {paper.abstract ? paper.abstract.substring(0, 300) + (paper.abstract.length > 300 ? "..." : "") : 
                             paper.tldr?.text ? paper.tldr.text : "No abstract available."}
                          </p>
                          <div className="mt-4 space-y-2">
                            {paper.authors && paper.authors.length > 0 && (
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">Authors:</span>
                                <span className="text-muted-foreground">
                                  {paper.authors.map(a => a.name).join(", ")}
                                </span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">Read Abstract</Button>
                          {paper.openAccessPdf?.url && (
                            <Button variant="link" size="sm" className="flex items-center gap-1" asChild>
                              <a href={paper.openAccessPdf.url} target="_blank" rel="noopener noreferrer">
                                View Full Paper <ArrowUpRight className="h-3 w-3" />
                              </a>
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-muted/30 rounded-lg">
                      <p className="text-lg font-medium mb-2">No Research Papers Loaded</p>
                      <p className="text-muted-foreground">Click the button below to load research papers.</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={loadMorePapers}
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading..." : "Load Research Papers"}
                      </Button>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Add a Load More button when we have papers and we're not in search mode */}
            {!searchQuery && sortedPapers.length > 0 && (
              <div className="text-center pt-6">
                <Button
                  onClick={loadMorePapers}
                  disabled={isLoading}
                  variant="outline"
                  className="px-6"
                >
                  {isLoading ? "Loading..." : "Load More Research"}
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="brain" className="space-y-6 mt-6">
            <div className="text-center py-10 bg-muted/30 rounded-lg">
              <p className="text-lg font-medium mb-2">Loading Brain Health Research</p>
              <p className="text-muted-foreground text-base">Please use the search function above to find specific brain health research papers.</p>
              <Button
                variant="outline"
                className="mt-4 text-base"
                onClick={() => {
                  setSearchQuery("brain health cognitive function neuroplasticity");
                  searchPapers();
                }}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load Brain Health Research"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="stroke" className="space-y-6 mt-6">
            <div className="text-center py-10 bg-muted/30 rounded-lg">
              <p className="text-lg font-medium mb-2">Loading Stroke Research</p>
              <p className="text-muted-foreground text-base">Please use the search function above to find specific stroke research papers.</p>
              <Button
                variant="outline"
                className="mt-4 text-base"
                onClick={() => {
                  setSearchQuery("stroke prevention treatment recovery");
                  searchPapers();
                }}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load Stroke Research"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Educational Resources</CardTitle>
                <CardDescription className="text-base">Access curated educational materials on brain health and stroke prevention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Patient Guides
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <p className="text-base">Downloadable guides and factsheets about brain health and stroke prevention.</p>
                      <ul className="list-none space-y-2">
                        <li>
                          <a 
                            href="https://www.stroke.org/-/media/stroke-files/stroke-resource-center/lets-talk-about-stroke/lets-talk-about-stroke-prevention.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-base text-primary hover:underline"
                          >
                            <Download className="h-4 w-4" />
                            Stroke Prevention Guide
                          </a>
                        </li>
                        <li>
                          <a 
                            href="https://www.cdc.gov/stroke/docs/consumer_education_stroke.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-base text-primary hover:underline"
                          >
                            <Download className="h-4 w-4" />
                            CDC Stroke Fact Sheet
                          </a>
                        </li>
                        <li>
                          <a 
                            href="https://www.nia.nih.gov/health/cognitive-health-and-older-adults" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-base text-primary hover:underline"
                          >
                            <Download className="h-4 w-4" />
                            Cognitive Health Guide
                          </a>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Video Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <p className="text-base">Expert-led video content on brain health and stroke prevention.</p>
                      <ul className="list-none space-y-2">
                        <li>
                          <a 
                            href="https://www.youtube.com/watch?v=wH8k7kavcSc" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-base text-primary hover:underline"
                          >
                            <Video className="h-4 w-4" />
                            Understanding Stroke Risk Factors
                          </a>
                        </li>
                        <li>
                          <a 
                            href="https://www.youtube.com/watch?v=9W3Jf3l9eAo" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-base text-primary hover:underline"
                          >
                            <Video className="h-4 w-4" />
                            Brain Health Tips
                          </a>
                        </li>
                        <li>
                          <a 
                            href="https://www.youtube.com/watch?v=1nBwfZZvjKo" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-base text-primary hover:underline"
                          >
                            <Video className="h-4 w-4" />
                            Exercise for Brain Health
                          </a>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Interactive Tools</CardTitle>
                <CardDescription className="text-base">Use these tools to assess and improve your brain health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Brain Health Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <p className="text-base">Take our comprehensive brain health assessment to understand your cognitive status.</p>
                      <Button className="w-full mt-2 text-base" asChild>
                        <a href="/assessment">Start Assessment</a>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Stroke Risk Calculator
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <p className="text-base">Calculate your stroke risk and get personalized prevention recommendations.</p>
                      <Button className="w-full mt-2 text-base" asChild>
                        <a href="/tools/stroke-risk">Calculate Risk</a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 