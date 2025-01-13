import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface RingSizerProps {
  diameter: number;
  onDiameterChange: (value: number) => void;
}

const RingSizer = ({ diameter, onDiameterChange }: RingSizerProps) => {
  const [ringSize, setRingSize] = useState('');

  useEffect(() => {
    // Convert diameter to US ring size (simplified conversion)
    const size = Math.round((diameter - 14) * 2) + 3;
    setRingSize(size.toString());
  }, [diameter]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <div
          className="w-[200px] h-[200px] mx-auto border-4 border-purple-500 rounded-full transition-all duration-300"
          style={{
            width: `${diameter * 5}px`,
            height: `${diameter * 5}px`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Badge variant="secondary" className="text-lg">
            {diameter.toFixed(1)}mm
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Adjust Size</label>
        <Slider
          value={[diameter]}
          onValueChange={([value]) => onDiameterChange(value)}
          min={14}
          max={24}
          step={0.1}
          className="w-full"
        />
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">Estimated US Ring Size</p>
        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{ringSize}</p>
      </div>
    </div>
  );
};

export default RingSizer;