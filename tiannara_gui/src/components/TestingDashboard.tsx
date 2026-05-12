import React, { useState, useEffect } from 'react';

interface TestResult {
  test_name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error_message?: string;
}

interface DomainReport {
  domain: string;
  timestamp: string;
  total_tests: number;
  passed: number;
  failed: number;
  skipped: number;
  pass_rate: number;
  coverage_percent?: number;
  duration_seconds: number;
  missing_dependencies: string[];
  results: TestResult[];
}

const TestingDashboard: React.FC = () => {
  const [reports, setReports] = useState<DomainReport[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockReports: DomainReport[] = [
      {
        domain: 'nlp',
        timestamp: new Date().toISOString(),
        total_tests: 100,
        passed: 100,
        failed: 0,
        skipped: 0,
        pass_rate: 100,
        coverage_percent: 95,
        duration_seconds: 45.2,
        missing_dependencies: [],
        results: []
      },
      {
        domain: 'predictive',
        timestamp: new Date().toISOString(),
        total_tests: 108,
        passed: 108,
        failed: 0,
        skipped: 0,
        pass_rate: 100,
        coverage_percent: 92,
        duration_seconds: 23.5,
        missing_dependencies: [],
        results: []
      },
      {
        domain: 'autonomy',
        timestamp: new Date().toISOString(),
        total_tests: 87,
        passed: 87,
        failed: 0,
        skipped: 0,
        pass_rate: 100,
        coverage_percent: 85,
        duration_seconds: 13.6,
        missing_dependencies: [],
        results: []
      },
      {
        domain: 'reasoning',
        timestamp: new Date().toISOString(),
        total_tests: 43,
        passed: 38,
        failed: 5,
        skipped: 0,
        pass_rate: 88,
        coverage_percent: 78,
        duration_seconds: 15.4,
        missing_dependencies: [],
        results: []
      }
    ];
    
    setReports(mockReports);
    setLoading(false);
  }, []);

  const filteredReports = selectedDomain === 'all' 
    ? reports 
    : reports.filter(r => r.domain === selectedDomain);

  const getTotalStats = () => {
    const totalTests = reports.reduce((sum, r) => sum + r.total_tests, 0);
    const totalPassed = reports.reduce((sum, r) => sum + r.passed, 0);
    const totalFailed = reports.reduce((sum, r) => sum + r.failed, 0);
    const avgPassRate = reports.length > 0 
      ? reports.reduce((sum, r) => sum + r.pass_rate, 0) / reports.length 
      : 0;

    return { totalTests, totalPassed, totalFailed, avgPassRate };
  };

  const stats = getTotalStats();

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Loading test results...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
          🧪 Autonomous Testing Dashboard
        </h1>
        <p style={{ color: '#666' }}>
          Real-time test results across all Tiannara Core domains
        </p>
      </div>

      {/* Overall Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px', borderRadius: '12px', color: 'white' }}>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Tests</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '8px' }}>{stats.totalTests}</div>
        </div>
        
        <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '20px', borderRadius: '12px', color: 'white' }}>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Passing</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '8px' }}>{stats.totalPassed}</div>
        </div>
        
        <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', padding: '20px', borderRadius: '12px', color: 'white' }}>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Failing</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '8px' }}>{stats.totalFailed}</div>
        </div>
        
        <div style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', padding: '20px', borderRadius: '12px', color: 'white' }}>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Avg Pass Rate</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '8px' }}>{stats.avgPassRate.toFixed(1)}%</div>
        </div>
      </div>

      {/* Domain Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: '600' }}>Filter by Domain:</label>
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px' }}
        >
          <option value="all">All Domains</option>
          {reports.map(report => (
            <option key={report.domain} value={report.domain}>
              {report.domain.charAt(0).toUpperCase() + report.domain.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Domain Cards */}
      <div style={{ display: 'grid', gap: '20px' }}>
        {filteredReports.map((report, index) => (
          <div
            key={index}
            style={{
              background: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            {/* Domain Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, textTransform: 'capitalize' }}>
                  {report.domain} Domain
                </h2>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                  Last run: {new Date(report.timestamp).toLocaleString()}
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: report.pass_rate >= 95 ? '#10b981' : report.pass_rate >= 80 ? '#f59e0b' : '#ef4444'
                }}>
                  {report.pass_rate.toFixed(1)}%
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Pass Rate</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{report.total_tests}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Total</div>
              </div>
              
              <div style={{ textAlign: 'center', padding: '12px', background: '#ecfdf5', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>{report.passed}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Passed</div>
              </div>
              
              <div style={{ textAlign: 'center', padding: '12px', background: report.failed > 0 ? '#fef2f2' : '#f9fafb', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: report.failed > 0 ? '#dc2626' : '#6b7280' }}>
                  {report.failed}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Failed</div>
              </div>
              
              <div style={{ textAlign: 'center', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                  {report.coverage_percent ? `${report.coverage_percent}%` : 'N/A'}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Coverage</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Test Progress</span>
                <span style={{ fontSize: '14px', color: '#666' }}>{report.passed}/{report.total_tests}</span>
              </div>
              <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${report.pass_rate}%`,
                    background: report.pass_rate >= 95 
                      ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
                      : report.pass_rate >= 80
                      ? 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
                      : 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)',
                    transition: 'width 0.5s ease'
                  }}
                />
              </div>
            </div>

            {/* Additional Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666' }}>
              <div>Duration: {report.duration_seconds.toFixed(2)}s</div>
              {report.missing_dependencies.length > 0 && (
                <div style={{ color: '#f59e0b' }}>
                  ⚠️ {report.missing_dependencies.length} dependencies installed
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: '40px', padding: '20px', textAlign: 'center', color: '#999', fontSize: '13px' }}>
        <p>Autonomous Testing Infrastructure • Tiannara Core</p>
        <p>Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TestingDashboard;
