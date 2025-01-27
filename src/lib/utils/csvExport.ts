import { Performance, SessionData } from '@/components/game/types';

export function downloadPerformanceData(performances: Performance[], sessionData: SessionData) {
  // Create CSV headers
  const headers = [
    'Question Number',
    'Response Time (ms)',
    'Correct',
    'BPM',
    'Timestamp'
  ].join(',');

  // Create CSV rows
  const rows = performances.map((perf, index) => {
    return [
      index + 1,
      perf.responseTime,
      perf.isCorrect ? 1 : 0,
      perf.bpm,
      new Date(sessionData.timestamp).toISOString()
    ].join(',');
  });

  // Add summary row
  const summaryRow = [
    'SUMMARY',
    `Average: ${(sessionData.responseTimes.reduce((a, b) => a + b, 0) / performances.length).toFixed(2)}`,
    `Accuracy: ${((sessionData.correct / sessionData.totalQuestions) * 100).toFixed(1)}%`,
    `Optimal BPM: ${sessionData.optimalBpm}`,
    ''
  ].join(',');

  // Combine all parts
  const csvContent = [
    headers,
    ...rows,
    '', // Empty row before summary
    summaryRow
  ].join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  // Create file name with timestamp
  const fileName = `performance_data_${new Date().toISOString().split('T')[0]}.csv`;
  
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, fileName);
  } else {
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
} 