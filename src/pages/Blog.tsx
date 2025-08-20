import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/mockData";
import { ArrowRight, Calendar, User } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            ความรู้เรื่องประกันรถยนต์
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            บทความและคำแนะนำจากผู้เชี่ยวชาญ เพื่อช่วยให้คุณเลือกประกันรถยนต์ได้อย่างถูกต้อง
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-lg text-foreground line-clamp-2">
                  {article.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>ทีมผู้เชี่ยวชาญ</span>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-primary">
                    อ่านเพิ่มเติม
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            โหลดบทความเพิ่มเติม
          </Button>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16">
          <Card className="bg-light-blue border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                รับความรู้ใหม่ๆ ทุกสัปดาห์
              </h2>
              <p className="text-muted-foreground mb-6">
                สมัครรับจดหมายข่าวเพื่อรับบทความและเทคนิคการเลือกประกันรถยนต์
              </p>
              <Button size="lg">
                สมัครรับจดหมายข่าว
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blog;