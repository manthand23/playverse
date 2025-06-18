
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Globe, Users, Play, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-green-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Playverse
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
            Discover amazing sports from around the world with the equipment you already have
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center space-y-8">
          {/* Feature Cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Globe className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Global Sports</h3>
                <p className="text-sm text-gray-300">Explore traditional games from every culture</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Any Group Size</h3>
                <p className="text-sm text-gray-300">Games for solo, pairs, or large groups</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Play className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Create Games</h3>
                <p className="text-sm text-gray-300">Invent and share your own sports</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to discover your next favorite sport?
            </h2>
            <div className="space-y-4 max-w-sm mx-auto">
              <Button 
                onClick={() => navigate('/app')}
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 text-lg"
              >
                Start Playing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full border-white/30 text-white hover:bg-white/10 backdrop-blur-sm py-4 text-lg"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Join thousands of players discovering new ways to stay active
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
