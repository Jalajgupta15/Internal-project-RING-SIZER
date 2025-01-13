import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { Measurement } from '@/types';

interface ProfileProps {
  measurements: Measurement[];
}

const Profile = ({ measurements }: ProfileProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Measurement History</h2>
      <ScrollArea className="h-[400px] pr-4">
        {measurements.length === 0 ? (
          <p className="text-center text-gray-500">No measurements yet</p>
        ) : (
          <div className="space-y-4">
            {measurements.map((measurement) => (
              <div
                key={measurement.id}
                className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {measurement.size.toFixed(1)}mm
                      <span className="text-sm text-gray-500 ml-2">
                        ({measurement.type})
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(measurement.date), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {Math.round((measurement.size - 14) * 2) + 3}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default Profile;