
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EquipmentSelectorProps {
  onEquipmentChange: (equipment: string[]) => void;
  selectedEquipment: string[];
}

const EquipmentSelector: React.FC<EquipmentSelectorProps> = ({
  onEquipmentChange,
  selectedEquipment
}) => {
  const equipmentOptions = [
    { name: 'Soccer Ball', emoji: '⚽', category: 'Ball Sports' },
    { name: 'Basketball', emoji: '🏀', category: 'Ball Sports' },
    { name: 'Ball', emoji: '🥎', category: 'Ball Sports' },
    { name: 'Cones', emoji: '🚧', category: 'Markers' },
    { name: 'Skipping Rope', emoji: '🪢', category: 'Fitness' },
    { name: 'Frisbee', emoji: '🥏', category: 'Throwing' },
    { name: 'Bat', emoji: '🏏', category: 'Striking' },
    { name: 'Racket', emoji: '🏸', category: 'Racquet' },
    { name: 'None', emoji: '🤸', category: 'Bodyweight' }
  ];

  const toggleEquipment = (equipment: string) => {
    const updated = selectedEquipment.includes(equipment)
      ? selectedEquipment.filter(item => item !== equipment)
      : [...selectedEquipment, equipment];
    onEquipmentChange(updated);
  };

  const categories = [...new Set(equipmentOptions.map(item => item.category))];

  return (
    <div className="space-y-6">
      {categories.map(category => (
        <div key={category} className="space-y-3">
          <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            {category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {equipmentOptions
              .filter(item => item.category === category)
              .map(equipment => (
                <Button
                  key={equipment.name}
                  variant={selectedEquipment.includes(equipment.name) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleEquipment(equipment.name)}
                  className={`transition-all duration-200 ${
                    selectedEquipment.includes(equipment.name)
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0'
                      : 'hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  <span className="mr-2">{equipment.emoji}</span>
                  {equipment.name}
                </Button>
              ))}
          </div>
        </div>
      ))}

      {selectedEquipment.length > 0 && (
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-gray-700">Selected Equipment:</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onEquipmentChange([])}
              className="text-gray-500 hover:text-red-500"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedEquipment.map(item => (
              <Badge 
                key={item} 
                variant="secondary"
                className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border border-orange-200"
              >
                {equipmentOptions.find(eq => eq.name === item)?.emoji} {item}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentSelector;
