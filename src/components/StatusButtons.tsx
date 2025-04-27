import React from 'react';
import { Button } from '@/components/ui/button';
import { ChallengeStatus } from '@/utils/challengeData';

type StatusButtonsProps = {
  status: ChallengeStatus;
  onStatusChange: (status: ChallengeStatus) => void;
};

const StatusButtons: React.FC<StatusButtonsProps> = ({ status, onStatusChange }) => {
  const isSelected = (value: ChallengeStatus) => status === value;

  return (
    <div className="flex gap-2 mt-6">
      <Button
        variant={isSelected('solved') ? 'default' : 'outline'}
        onClick={() => onStatusChange('solved')}
      >
        Solved
      </Button>
      <Button
        variant={isSelected('unsolved') ? 'default' : 'outline'}
        onClick={() => onStatusChange('unsolved')}
      >
        Unsolved
      </Button>
      <Button
        variant={isSelected('skipped') ? 'default' : 'outline'}
        onClick={() => onStatusChange('skipped')}
      >
        Skipped
      </Button>
    </div>
  );
};

export default StatusButtons;
