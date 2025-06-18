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
    { name: 'Soccer Ball', category: 'Balls' },
    { name: 'Basketball', category: 'Balls' },
    { name: 'Tennis Ball', category: 'Balls' },
    { name: 'Baseball', category: 'Balls' },
    { name: 'Volleyball', category: 'Balls' },
    { name: 'Rugby Ball', category: 'Balls' },
    { name: 'Ping Pong Ball', category: 'Balls' },
    { name: 'Football', category: 'Balls' },
    { name: 'Cricket Ball', category: 'Balls' },
    { name: 'Golf Ball', category: 'Balls' },
    { name: 'Beach Ball', category: 'Balls' },
    { name: 'Other Ball', category: 'Balls' },
    
    // Rackets & Sticks
    { name: 'Tennis Racket', category: 'Rackets' },
    { name: 'Badminton Racket', category: 'Rackets' },
    { name: 'Ping Pong Paddle', category: 'Rackets' },
    { name: 'Baseball Bat', category: 'Rackets' },
    { name: 'Hockey Stick', category: 'Rackets' },
    { name: 'Cricket Bat', category: 'Rackets' },
    
    // Nets
    { name: 'Volleyball Net', category: 'Nets' },
    { name: 'Tennis Net', category: 'Nets' },
    { name: 'Badminton Net', category: 'Nets' },
    { name: 'Basketball Net', category: 'Nets' },
    { name: 'Soccer Net', category: 'Nets' },
    { name: 'Hockey Net', category: 'Nets' },
    
    // Markers
    { name: 'Cones', category: 'Markers' },
    { name: 'Flags', category: 'Markers' },
    { name: 'Chalk', category: 'Markers' },
    
    // Other
    { name: 'Frisbee', category: 'Other' },
    { name: 'Bean Bags', category: 'Other' },
    { name: 'Skipping Rope', category: 'Other' },
    { name: 'Hula Hoop', category: 'Other' },
    { name: 'Stopwatch', category: 'Other' },
    
    // No Equipment
    { name: 'No Equipment', category: 'None' }
  ];

  const toggleEquipment = (equipment: string) => {
    const updated = selectedEquipment.includes(equipment)
      ? selectedEquipment.filter(item => item !== equipment)
      : [...selectedEquipment, equipment];
    onEquipmentChange(updated);
  };

  const categories = [
    { id: 'Balls', name: 'Balls' },
    { id: 'Rackets', name: 'Rackets' },
    { id: 'Nets', name: 'Nets' },
    { id: 'Markers', name: 'Markers' },
    { id: 'Other', name: 'Other' },
    { id: 'None', name: 'None' }
  ];

  return (
    <div className="space-y-4">
      <Tabs defaultValue="Balls" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto p-1 bg-gray-100">
          {categories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center justify-center p-3 text-sm font-medium data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {equipmentOptions
                .filter(item => item.category === category.id)
                .map(equipment => (
                  <Button
                    key={equipment.name}
                    variant={selectedEquipment.includes(equipment.name) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleEquipment(equipment.name)}
                    className={`transition-all duration-200 h-auto py-4 px-3 text-center ${
                      selectedEquipment.includes(equipment.name)
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0'
                        : 'hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    <span className="text-sm font-medium">{equipment.name}</span>
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
                {item}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentSelector;
