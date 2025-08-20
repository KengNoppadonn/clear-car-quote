import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    channel: "",
    message: "",
    consent: false,
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "กรุณายินยอมเงื่อนไข",
        description: "คุณต้องยินยอมให้เราติดต่อกลับเพื่อดำเนินการต่อ",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    toast({
      title: "ส่งข้อความสำเร็จ",
      description: "เราจะติดต่อกลับไปภายใน 24 ชั่วโมง",
    });

    // Reset form
    setFormData({
      name: "",
      phone: "",
      channel: "",
      message: "",
      consent: false,
    });
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            ติดต่อเรา
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            มีคำถามเกี่ยวกับประกันรถยนต์? ทีมผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษาฟรี
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>ฝากข้อความถึงเรา</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="channel">ช่องทางที่สะดวกรับการติดต่อ</Label>
                  <Select
                    value={formData.channel}
                    onValueChange={(value) => setFormData({ ...formData, channel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกช่องทาง" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="โทร">โทรศัพท์</SelectItem>
                      <SelectItem value="ไลน์">Line</SelectItem>
                      <SelectItem value="อื่นๆ">อื่นๆ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">ข้อความ</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="บอกเราเกี่ยวกับความต้องการของคุณ..."
                    rows={4}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, consent: checked as boolean })
                    }
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed">
                    ยินยอมให้ Insurance Compare ติดต่อกลับเพื่อให้คำปรึกษา
                    และส่งข้อมูลโปรโมชันที่เกี่ยวข้อง
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  ส่งข้อความ
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลการติดต่อ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">โทรศัพท์</div>
                    <div className="text-muted-foreground">02-xxx-xxxx</div>
                    <div className="text-muted-foreground">080-xxx-xxxx</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">อีเมล</div>
                    <div className="text-muted-foreground">info@insurancecompare.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">Line</div>
                    <div className="text-muted-foreground">@insurancecompare</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">เวลาทำการ</div>
                    <div className="text-muted-foreground">จันทร์-ศุกร์ 9:00-18:00</div>
                    <div className="text-muted-foreground">เสาร์ 9:00-16:00</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">
                  ปรึกษาฟรี 24/7
                </h3>
                <p className="mb-4 opacity-90">
                  ทีมผู้เชี่ยวชาญพร้อมให้คำปรึกษาและช่วยหาประกันที่เหมาะกับคุณ
                </p>
                <Button variant="secondary" className="w-full">
                  แชทเลย
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-light-blue border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  สิทธิประโยชน์พิเศษ
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• ปรึกษาฟรี ไม่มีค่าใช้จ่าย</li>
                  <li>• เปรียบเทียบจากบริษัทประกัน 25+ แห่ง</li>
                  <li>• บริการหลังการขาย</li>
                  <li>• ช่วยเหลือเวลาเกิดอุบัติเหตุ</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;