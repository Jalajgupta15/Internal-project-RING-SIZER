import { useState, useEffect } from 'react';
import { Ruler, History, Medal, Settings2, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import RingSizer from '@/components/RingSizer';
import Profile from '@/components/Profile';
import SizeGuide from '@/components/SizeGuide';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Achievement, Measurement } from '@/types';

function App() {
  const [measurements, setMeasurements] = useLocalStorage<Measurement[]>('measurements', []);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('achievements', []);
  const { toast } = useToast();
  const [diameter, setDiameter] = useState(16);
  const [circumference, setCircumference] = useState('');

  const addMeasurement = (size: number, type: 'ring' | 'circumference') => {
    const newMeasurement: Measurement = {
      id: Date.now(),
      size,
      type,
      date: new Date().toISOString(),
    };
    setMeasurements([...measurements, newMeasurement]);

    // Check for achievements
    if (measurements.length === 0) {
      unlockAchievement('first-measurement', 'First Measurement', 'Completed your first ring measurement!');
    }
    if (measurements.length === 4) {
      unlockAchievement('precision-master', 'Precision Master', 'Completed 5 measurements!');
    }
  };

  const unlockAchievement = (id: string, title: string, description: string) => {
    if (!achievements.find(a => a.id === id)) {
      const newAchievement: Achievement = { id, title, description, date: new Date().toISOString() };
      setAchievements([...achievements, newAchievement]);
      toast({
        title: '🎉 Achievement Unlocked!',
        description: title,
      });
    }
  };

  const handleCircumferenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const circumferenceNum = parseFloat(circumference);
    if (circumferenceNum) {
      const diameter = circumferenceNum / Math.PI;
      setDiameter(diameter);
      addMeasurement(diameter, 'circumference');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 dark:text-purple-300 mb-2">Ring Sizer</h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
            Find your perfect ring size using our interactive tool
          </p>
        </div>

        <Tabs defaultValue="sizer" className="max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-4 gap-4 mb-8">
            <TabsTrigger value="sizer" className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              <span>Ring Sizer</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Medal className="w-4 h-4" />
              <span>Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Size Guide</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sizer">
            <Card className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Ring Measurement</h2>
                  <RingSizer diameter={diameter} onDiameterChange={(value) => {
                    setDiameter(value);
                    addMeasurement(value, 'ring');
                  }} />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Finger Circumference</h2>
                  <form onSubmit={handleCircumferenceSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Enter circumference in mm"
                        value={circumference}
                        onChange={(e) => setCircumference(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Button type="submit">Calculate Size</Button>
                  </form>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Profile measurements={measurements} />
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Your Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Medal className="w-8 h-8 text-yellow-500" />
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="guide">
            <SizeGuide />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;