"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Map } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavigationFeedbackProps {
  position: [number, number];
  command: string;
  deviationDetected: boolean;
}

export function NavigationFeedback({
  position,
  command,
  deviationDetected,
}: NavigationFeedbackProps) {
  const isMobile = useIsMobile();

  return (
    <Card
      className={`bg-gradient-to-r from-primary-50 to-white ${
        deviationDetected ? "border-red-400" : "border-primary-200"
      }`}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2 text-primary text-sm sm:text-base font-medium">
            <Map className="h-5 w-5" />
            <span>Navegação Assistida</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              Posição atual: ({Math.round(position[0])},{" "}
              {Math.round(position[1])})
            </div>

            {deviationDetected && (
              <div className="flex items-center mt-1 sm:mt-0 text-red-600 text-sm">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span>Desvio detectado</span>
              </div>
            )}
          </div>

          <div
            className={`text-xl sm:text-2xl font-medium p-4 sm:p-6 rounded-md ${
              deviationDetected
                ? "bg-red-50 text-red-900"
                : "bg-primary-50 text-primary-900"
            } text-center sm:text-left`}
          >
            {command}
          </div>

          <div className="flex justify-center sm:justify-start">
            <div className="grid grid-cols-3 gap-1 w-full max-w-[150px]">
              <div
                className={`h-2 rounded-full ${
                  command.includes("esquerda") ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`h-2 rounded-full ${
                  command.includes("frente") ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`h-2 rounded-full ${
                  command.includes("direita") ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
