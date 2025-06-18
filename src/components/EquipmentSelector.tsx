
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EquipmentSelectorProps {
  onEquipmentChange: (equipment: string[]) => void;
  selectedEquipment: string[];
}

const EquipmentSelector: React.FC<EquipmentSelectorProps> = ({
  onEquipmentChange,
  selectedEquipment
}) => {
  const equipmentOptions = [
    // Balls
    { name: 'Soccer Ball', emoji: '⚽', category: 'Balls' },
    { name: 'Basketball', emoji: '🏀', category: 'Balls' },
    { name: 'Tennis Ball', emoji: '🎾', category: 'Balls' },
    { name: 'Baseball', emoji: '⚾', category: 'Balls' },
    { name: 'Volleyball', emoji: '🏐', category: 'Balls' },
    { name: 'Rugby Ball', emoji: '🏈', category: 'Balls' },
    { name: 'Ping Pong Ball', emoji: '🏓', category: 'Balls' },
    { name: 'Any Ball', emoji: '⭕', category: 'Balls' },
    
    // Rackets & Sticks
    { name: 'Tennis Racket', emoji: '🎾', category: 'Rackets' },
    { name: 'Badminton Racket', emoji: '🏸', category: 'Rackets' },
    { name: 'Ping Pong Paddle', emoji: '🏓', category: 'Rackets' },
    { name: 'Baseball Bat', emoji: '⚾', category: 'Rackets' },
    { name: 'Hockey Stick', emoji: '🏒', category: 'Rackets' },
    { name: 'Cricket Bat', emoji: '🏏', category: 'Rackets' },
    
    // Goals & Targets
    { name: 'Basketball Hoop', emoji: '🏀', category: 'Goals' },
    { name: 'Soccer Goal', emoji: '🥅', category: 'Goals' },
    { name: 'Bowling Pins', emoji: '🎳', category: 'Goals' },
    { name: 'Dartboard', emoji: '🎯', category: 'Goals' },
    { name: 'Target', emoji: '🎪', category: 'Goals' },
    
    // Nets & Barriers
    { name: 'Volleyball Net', emoji: '🏐', category: 'Nets' },
    { name: 'Tennis Net', emoji: '🎾', category: 'Nets' },
    { name: 'Badminton Net', emoji: '🏸', category: 'Nets' },
    { name: 'Basketball Net', emoji: '🏀', category: 'Nets' },
    { name: 'Any Net', emoji: '🕸️', category: 'Nets' },
    
    // Training & Fitness
    { name: 'Skipping Rope', emoji: '🪢', category: 'Training' },
    { name: 'Hula Hoop', emoji: '⭕', category: 'Training' },
    { name: 'Resistance Bands', emoji: '🔗', category: 'Training' },
    { name: 'Dumbbells', emoji: '🏋️', category: 'Training' },
    { name: 'Stopwatch', emoji: '⏱️', category: 'Training' },
    
    // Setup & Markers
    { name: 'Cones', emoji: '🚧', category: 'Setup' },
    { name: 'Flags', emoji: '🚩', category: 'Setup' },
    { name: 'Chalk', emoji: '✏️', category: 'Setup' },
    { name: 'Rope', emoji: '🪢', category: 'Setup' },
    { name: 'Markers', emoji: '📍', category: 'Setup' },
    
    // Fun & Games
    { name: 'Frisbee', emoji: '🥏', category: 'Fun' },
    { name: 'Water Balloons', emoji: '🎈', category: 'Fun' },
    { name: 'Bean Bags', emoji: '👜', category: 'Fun' },
    { name: 'Balloons', emoji: '🎈', category: 'Fun' },
    
    // No Equipment
    { name: 'No Equipment', emoji: '🤸', category: 'None' }
  ];

  const toggleEquipment = (equipment: string) => {
    const updated = selectedEquipment.includes(equipment)
      ? selectedEquipment.filter(item => item !== equipment)
      : [...selectedEquipment, equipment];
    onEquipmentChange(updated);
  };

  const categories = [
    { id: 'Balls', name: 'Balls', icon: '⚽' },
    { id: 'Rackets', name: 'Rackets & Sticks', icon: '🎾' },
    { id: 'Goals', name: 'Goals & Targets', icon: '🥅' },
    { id: 'Nets', name: 'Nets', icon: '🕸️' },
    { id: 'Training', name: 'Training', icon: '🏋️' },
    { id: 'Setup', name: 'Setup', icon: '🚧' },
    { id: 'Fun', name: 'Fun', icon: '🥏' },
    { id: 'None', name: 'None', icon: '🤸' }
  ];

  return (
    <div className="space-y-4">
      <Tabs defaultValue="Balls" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1 bg-gray-100">
          {categories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex flex-col items-center p-2 text-xs data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <span className="text-base mb-1">{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {equipmentOptions
                .filter(item => item.category === category.id)
                .map(equipment => (
                  <Button
                    key={equipment.name}
                    variant={selectedEquipment.includes(equipment.name) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleEquipment(equipment.name)}
                    className={`transition-all duration-200 h-auto py-3 px-2 flex flex-col items-center space-y-1 ${
                      selectedEquipment.includes(equipment.name)
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg'
                        : 'hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    <span className="text-lg">{equipment.emoji}</span>
                    <span className="text-xs text-center leading-tight">{equipment.name}</span>
                  </Button>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

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
