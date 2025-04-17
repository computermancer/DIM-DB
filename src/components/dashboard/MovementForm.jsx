import React from 'react';
import MovementInfoSection from './MovementInfoSection';
import MovementMechanicsSection from './MovementMechanicsSection';
import MovementExecutionSection from './MovementExecutionSection';
import MovementVideoSection from './MovementVideoSection';
import MovementTextBlockParser from './MovementTextBlockParser';
import MovementSubmitSection from './MovementSubmitSection';
import MovementNotesSection from './MovementNotesSection';

const MovementForm = ({ 
  newMovement, 
  setNewMovement, 
  textBlock, 
  setTextBlock, 
  loading, 
  showToast, 
  setShowToast, 
  toastType, 
  setToastType, 
  addMovement, 
  parseTextBlock 
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <MovementTextBlockParser 
        textBlock={textBlock}
        setTextBlock={setTextBlock}
        parseTextBlock={parseTextBlock}
      />

      <form onSubmit={addMovement} className="space-y-6">
        <MovementInfoSection 
          newMovement={newMovement} 
          setNewMovement={setNewMovement}
        />
        
        <MovementMechanicsSection 
          newMovement={newMovement} 
          setNewMovement={setNewMovement}
        />
        
        <MovementExecutionSection 
          newMovement={newMovement} 
          setNewMovement={setNewMovement}
        />
        
        <MovementVideoSection 
          newMovement={newMovement} 
          setNewMovement={setNewMovement}
        />

        <MovementNotesSection 
          newMovement={newMovement} 
          setNewMovement={setNewMovement}
        />
        
        <MovementSubmitSection 
          loading={loading}
          showToast={showToast}
          setShowToast={setShowToast}
          toastType={toastType}
          setToastType={setToastType}
        />
      </form>
    </div>
  );
};

export default MovementForm;
