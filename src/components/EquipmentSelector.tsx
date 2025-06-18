
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
    // Ball Sports
    { name: 'Soccer Ball', emoji: '⚽', category: 'Ball Sports' },
    { name: 'Basketball', emoji: '🏀', category: 'Ball Sports' },
    { name: 'Tennis Ball', emoji: '🎾', category: 'Ball Sports' },
    { name: 'Baseball', emoji: '⚾', category: 'Ball Sports' },
    { name: 'Ball', emoji: '🥎', category: 'Ball Sports' },
    { name: 'Volleyball', emoji: '🏐', category: 'Ball Sports' },
    
    // Striking Equipment
    { name: 'Baseball Bat', emoji: '⚾', category: 'Striking' },
    { name: 'Tennis Racket', emoji: '🎾', category: 'Racquet' },
    { name: 'Badminton Racket', emoji: '🏸', category: 'Racquet' },
    { name: 'Ping Pong Paddle', emoji: '🏓', category: 'Racquet' },
    { name: 'Hockey Stick', emoji: '🏒', category: 'Striking' },
    
    // Fitness & Training
    { name: 'Skipping Rope', emoji: '🪢', category: 'Fitness' },
    { name: 'Dumbbells', emoji: '🏋️', category: 'Fitness' },
    { name: 'Resistance Bands', emoji: '🔗', category: 'Fitness' },
    { name: 'Hula Hoop', emoji: '⭕', category: 'Fitness' },
    
    // Targets & Goals
    { name: 'Basketball Hoop', emoji: '🏀', category: 'Targets' },
    { name: 'Soccer Goal', emoji: '🥅', category: 'Targets' },
    { name: 'Bowling Pins', emoji: '🎳', category: 'Targets' },
    { name: 'Dartboard', emoji: '🎯', category: 'Targets' },
    
    // Nets & Barriers
    { name: 'Volleyball Net', emoji: '🏐', category: 'Nets' },
    { name: 'Tennis Net', emoji: '🎾', category: 'Nets' },
    { name: 'Badminton Net', emoji: '🏸', category: 'Nets' },
    { name: 'Net', emoji: '🥅', category: 'Nets' },
    
    // Markers & Setup
    { name: 'Cones', emoji: '🚧', category: 'Markers' },
    { name: 'Flags', emoji: '🚩', category: 'Markers' },
    { name: 'Chalk', emoji: '✏️', category: 'Markers' },
    { name: 'Rope', emoji: '🪢', category: 'Markers' },
    
    // Throwing Sports
    { name: 'Frisbee', emoji: '🥏', category: 'Throwing' },
    { name: 'Javelin', emoji: '🏹', category: 'Throwing' },
    { name: 'Shot Put', emoji: '⚪', category: 'Throwing' },
    
    // Bodyweight
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
          <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide border-b border-gray-200 pb-1">
            {category}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {equipmentOptions
              .filter(item => item.category === category)
              .map(equipment => (
                <Button
                  key={equipment.name}
                  variant={selectedEquipment.includes(equipment.name) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleEquipment(equipment.name)}
                  className={`transition-all duration-200 h-auto py-3 px-2 flex flex-col items-center space-y-1 ${
                    selectedEquipment.includes(equipment.name)
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg scale-105'
                      : 'hover:border-orange-300 hover:bg-orange-50 hover:scale-105'
                  }`}
                >
                  <span className="text-lg">{equipment.emoji}</span>
                  <span className="text-xs text-center leading-tight">{equipment.name}</span>
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
                className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border border-orange-200 px-3 py-1"
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
