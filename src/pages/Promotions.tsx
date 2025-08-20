import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { promotions } from "@/data/mockData";
import { Calendar, Clock } from "lucide-react";

const Promotions = () => {
  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            โปรโมชันและข้อเสนอพิเศษ
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            รับข้อเสนอพิเศษสำหรับประกันรถยนต์ ส่วนลด โปรโมชันดอกเบี้ย 0% และสิทธิประโยชน์มากมาย
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {promotions.map((promotion) => (
            <Card key={promotion.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={promotion.imageUrl}
                  alt={promotion.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                  โปรพิเศษ
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl text-foreground">
                  {promotion.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {promotion.description}
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    หมดเขต: {promotion.expiresAt.toLocaleDateString('th-TH')}
                  </span>
                </div>
                
                <Button className="w-full">
                  รับโปรโมชันนี้
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                ไม่พลาดโปรโมชันดีๆ
              </h2>
              <p className="text-lg mb-6 opacity-90">
                สมัครรับข่าวสารเพื่อรับโปรโมชันล่าสุดก่อนใคร
              </p>
              <Button variant="secondary" size="lg">
                สมัครรับข่าวสาร
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Promotions;