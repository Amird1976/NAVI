import React, { useState, useMemo } from 'react';
import { Calculator, Shield, Server, Users, Clock, FileText, Sparkles, TrendingDown, Database, Network, Lock } from 'lucide-react';

const NAVIPricingCalculator = () => {
  const [config, setConfig] = useState({
    endpoints: 100,
    baseModules: ['os_hardware', 'network_communications', 'users_permissions', 'processes_executions', 'hardening_measures'],
    additionalModules: [],
    executionMode: 'self',
    deployment: 'our-server',
    scanFrequency: 'monthly',
    scanCount: 12,
    aiEnabled: false,
    strategicClient: false
  });

  // מודולי בסיס - חובה
  const baseModules = [
    { id: 'os_hardware', name: 'מערכת הפעלה וחומרה', required: true },
    { id: 'network_communications', name: 'רשת ותקשורת', required: true },
    { id: 'users_permissions', name: 'משתמשים והרשאות', required: true },
    { id: 'processes_executions', name: 'תהליכים והרצות', required: true },
    { id: 'hardening_measures', name: 'מדדי הקשחה בסיסיים', required: true }
  ];

  // כל המודולים הנוספים - מתוך המסמכים
  const additionalModules = [
    // Devices & Peripherals
    { id: 'usb_devices', name: 'התקני USB ומדיה נשלפת', category: 'התקנים', price: 4500 },
    { id: 'bluetooth', name: 'Bluetooth וחיבורים אלחוטיים', category: 'התקנים', price: 3800 },
    { id: 'printers', name: 'מדפסות וציוד היקפי', category: 'התקנים', price: 3200 },
    { id: 'external_storage', name: 'אחסון חיצוני ומדיה', category: 'התקנים', price: 3500 },
    
    // Network Advanced
    { id: 'wifi_wireless', name: 'WiFi וציוד אלחוטי מתקדם', category: 'רשת', price: 4200 },
    { id: 'dns_advanced', name: 'DNS מתקדם וניתוח', category: 'רשת', price: 5000 },
    { id: 'vpn_remote', name: 'VPN וגישה מרוחקת', category: 'רשת', price: 4800 },
    { id: 'firewall_rules', name: 'Firewall וחוקי אבטחה', category: 'רשת', price: 5500 },
    { id: 'proxy_web', name: 'Proxy וסינון אינטרנט', category: 'רשת', price: 4000 },
    { id: 'network_shares', name: 'שיתופי רשת ו-SMB', category: 'רשת', price: 3800 },
    
    // Security & Protection
    { id: 'antivirus_protection', name: 'Antivirus וזיהוי מלוואר', category: 'אבטחה', price: 5200 },
    { id: 'encryption_disk', name: 'הצפנת דיסק (BitLocker, etc.)', category: 'אבטחה', price: 4500 },
    { id: 'certificates_pki', name: 'תעודות דיגיטליות ו-PKI', category: 'אבטחה', price: 4200 },
    { id: 'security_policies', name: 'מדיניות אבטחה ו-GPO', category: 'אבטחה', price: 5000 },
    { id: 'edr_endpoint', name: 'EDR וזיהוי איומים', category: 'אבטחה', price: 6500 },
    
    // System Deep Analysis
    { id: 'registry_analysis', name: 'Registry מתקדם וניתוח', category: 'מערכת', price: 4200 },
    { id: 'scheduled_tasks', name: 'משימות מתוזמנות', category: 'מערכת', price: 3800 },
    { id: 'services_drivers', name: 'שירותים ודרייברים', category: 'מערכת', price: 4000 },
    { id: 'startup_autorun', name: 'Startup ו-Autorun', category: 'מערכת', price: 3500 },
    { id: 'event_logs', name: 'לוגים ואירועי מערכת', category: 'מערכת', price: 5800 },
    { id: 'powershell_history', name: 'PowerShell History', category: 'מערכת', price: 4500 },
    { id: 'command_history', name: 'Command Line History', category: 'מערכת', price: 3800 },
    
    // MITRE ATT&CK Coverage
    { id: 'persistence_techniques', name: 'מנגנוני Persistence', category: 'MITRE', price: 6800 },
    { id: 'lateral_movement', name: 'Lateral Movement Analysis', category: 'MITRE', price: 7200 },
    { id: 'privilege_escalation', name: 'Privilege Escalation Detection', category: 'MITRE', price: 7500 },
    { id: 'credential_access', name: 'Credential Access Monitoring', category: 'MITRE', price: 7800 },
    { id: 'defense_evasion', name: 'Defense Evasion Techniques', category: 'MITRE', price: 6500 },
    { id: 'execution_analysis', name: 'Execution Methods Analysis', category: 'MITRE', price: 6200 },
    { id: 'discovery_recon', name: 'Discovery & Reconnaissance', category: 'MITRE', price: 5800 },
    
    // Compliance & Standards
    { id: 'mitre_mapping', name: 'MITRE ATT&CK Mapping מלא', category: 'תאימות', price: 8500 },
    { id: 'ravmagen2_compliance', name: 'רב-מגן 2 Compliance', category: 'תאימות', price: 9200 },
    { id: 'cis_benchmarks', name: 'CIS Benchmarks', category: 'תאימות', price: 6500 },
    { id: 'nist_framework', name: 'NIST Framework Mapping', category: 'תאימות', price: 7000 },
    
    // Advanced Forensics
    { id: 'memory_forensics', name: 'Memory Forensics', category: 'פורנזיקה', price: 8000 },
    { id: 'timeline_analysis', name: 'Timeline Construction', category: 'פורנזיקה', price: 6500 },
    { id: 'artifact_recovery', name: 'Artifact Recovery & Analysis', category: 'פורנזיקה', price: 7200 },
    { id: 'browser_forensics', name: 'Browser Forensics מלא', category: 'פורנזיקה', price: 5500 },
    { id: 'email_forensics', name: 'Email Forensics', category: 'פורנזיקה', price: 6000 },
    
    // SIEM & Detection
    { id: 'siem_readiness', name: 'SIEM Readiness Assessment', category: 'גילוי', price: 7500 },
    { id: 'log_coverage', name: 'Log Coverage Analysis', category: 'גילוי', price: 6200 },
    { id: 'detection_gaps', name: 'Detection Gaps Identification', category: 'גילוי', price: 6800 },
    { id: 'ioc_hunting', name: 'IOC Hunting Capabilities', category: 'גילוי', price: 7000 }
  ];

  const executionModes = [
    { id: 'self', name: 'החקירה מבוצעת על ידי הלקוח', cost: 0, perScan: 0 },
    { id: 'remote', name: 'תמיכה מרחוק וליווי', cost: 12000, perScan: 4500 },
    { id: 'onsite', name: 'שליחת חוקר מומחה לאתר', cost: 25000, perScan: 12000 },
    { id: 'managed', name: 'שירות מנוהל מלא', cost: 45000, perScan: 8000 }
  ];

  const deploymentModes = [
    { id: 'our-server', name: 'שרת מנוהל אצלנו (SaaS)', cost: 38000, monthly: 4500 },
    { id: 'client-server', name: 'רכישת שרת ייעודי ללקוח', cost: 125000, monthly: 0 },
    { id: 'hybrid', name: 'פתרון היברידי (Cloud + On-Prem)', cost: 85000, monthly: 6500 },
    { id: 'managed-full', name: 'שירות מנוהל מלא כולל תחזוקה', cost: 65000, monthly: 12000 }
  ];

  const scanFrequencies = [
    { id: 'daily', name: 'יומי', multiplier: 2.0 },
    { id: 'weekly', name: 'שבועי', multiplier: 1.7 },
    { id: 'biweekly', name: 'דו-שבועי', multiplier: 1.4 },
    { id: 'monthly', name: 'חודשי', multiplier: 1.0 },
    { id: 'quarterly', name: 'רבעוני', multiplier: 0.75 },
    { id: 'biannual', name: 'חצי שנתי', multiplier: 0.6 },
    { id: 'annual', name: 'שנתי', multiplier: 0.5 }
  ];

  const pricing = useMemo(() => {
    // Base license cost per endpoint - מוגדל לפי שוק
    const baseLicensePerEndpoint = 850;
    const endpointCost = config.endpoints * baseLicensePerEndpoint;

    // Additional modules cost
    const additionalModulesCost = config.additionalModules.reduce((sum, moduleId) => {
      const module = additionalModules.find(m => m.id === moduleId);
      return sum + (module?.price || 0);
    }, 0);

    // Execution mode cost
    const execMode = executionModes.find(m => m.id === config.executionMode);
    const executionSetupCost = execMode?.cost || 0;
    const executionPerScanCost = (execMode?.perScan || 0) * config.scanCount;

    // Deployment cost
    const deplMode = deploymentModes.find(m => m.id === config.deployment);
    const deploymentSetupCost = deplMode?.cost || 0;
    const deploymentMonthlyCost = (deplMode?.monthly || 0) * 12;

    // Scan frequency multiplier
    const freqMultiplier = scanFrequencies.find(f => f.id === config.scanFrequency)?.multiplier || 1.0;
    const scanBaseCost = 4500; // עלות בסיס לסריקה
    const scanCost = config.scanCount * scanBaseCost * freqMultiplier;

    // AI cost - מוגדל משמעותית
    const aiBaseCost = 65000;
    const aiPerEndpoint = 150;
    const aiCost = config.aiEnabled ? aiBaseCost + (config.endpoints * aiPerEndpoint) : 0;

    // Subtotal
    const subtotal = 
      endpointCost + 
      additionalModulesCost + 
      executionSetupCost + 
      executionPerScanCost + 
      deploymentSetupCost + 
      deploymentMonthlyCost + 
      scanCost + 
      aiCost;

    // Strategic client discount
    const discount = config.strategicClient ? subtotal * 0.10 : 0;
    const total = subtotal - discount;

    return {
      endpointCost,
      additionalModulesCost,
      executionSetupCost,
      executionPerScanCost,
      deploymentSetupCost,
      deploymentMonthlyCost,
      scanCost,
      aiCost,
      subtotal,
      discount,
      total
    };
  }, [config]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const groupedModules = useMemo(() => {
    const groups = {};
    additionalModules.forEach(module => {
      if (!groups[module.category]) {
        groups[module.category] = [];
      }
      groups[module.category].push(module);
    });
    return groups;
  }, []);

  const categoryIcons = {
    'התקנים': Database,
    'רשת': Network,
    'אבטחה': Shield,
    'מערכת': Server,
    'MITRE': Lock,
    'תאימות': FileText,
    'פורנזיקה': Calculator,
    'גילוי': Sparkles
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="w-10 h-10 md:w-12 md:h-12 text-white" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">NAVI Forensic Suite</h1>
              <button onClick={() => window.print()} className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold mb-4 no-print shadow-lg hover:bg-blue-50">
              🖨️ הדפס הצעה / שמור כ-PDF
              </button>
              <p className="text-blue-100 text-base md:text-lg">מחשבון מחירים - V12 Enterprise Edition</p>
            </div>
          </div>
          <div className="text-blue-50 text-xs md:text-sm">
            Offline Cyber Forensics & Security Posture Platform | Military-Grade Security
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Endpoints */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-800">מספר תחנות קצה</h2>
              </div>
              <input
                type="number"
                value={config.endpoints}
                onChange={(e) => setConfig({...config, endpoints: parseInt(e.target.value) || 0})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                min="1"
                max="50000"
              />
              <p className="text-sm text-gray-500 mt-2">עלות בסיס: ₪850 לתחנה (מבוסס שוק 2025)</p>
            </div>

            {/* Modules */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-800">מודולים פורנזיים</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  מודולי בסיס (כלולים במחיר)
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {baseModules.map(module => (
                    <div key={module.id} className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      <span className="text-sm text-gray-700">{module.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-3">מודולים מתקדמים (לבחירה)</h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {Object.entries(groupedModules).map(([category, modules]) => {
                    const IconComponent = categoryIcons[category] || FileText;
                    return (
                      <div key={category} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold text-gray-800">{category}</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {modules.map(module => (
                            <label key={module.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer transition">
                              <input
                                type="checkbox"
                                checked={config.additionalModules.includes(module.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setConfig({...config, additionalModules: [...config.additionalModules, module.id]});
                                  } else {
                                    setConfig({...config, additionalModules: config.additionalModules.filter(id => id !== module.id)});
                                  }
                                }}
                                className="w-4 h-4"
                              />
                              <div className="flex-1 flex justify-between items-center">
                                <span className="text-sm text-gray-700">{module.name}</span>
                                <span className="text-xs font-semibold text-blue-600">{formatCurrency(module.price)}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Execution Mode */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-800">אופן ביצוע החקירה</h2>
              </div>
              <div className="space-y-2">
                {executionModes.map(mode => (
                  <label key={mode.id} className="flex items-start gap-3 p-4 border-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                    <input
                      type="radio"
                      name="execution"
                      checked={config.executionMode === mode.id}
                      onChange={() => setConfig({...config, executionMode: mode.id})}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{mode.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {mode.cost > 0 && `הקמה: ${formatCurrency(mode.cost)}`}
                        {mode.perScan > 0 && ` | עלות לסריקה: ${formatCurrency(mode.perScan)}`}
                        {mode.cost === 0 && mode.perScan === 0 && 'ללא עלות נוספת - הלקוח מבצע באופן עצמאי'}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Deployment */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-800">אופן פריסת השרת</h2>
              </div>
              <div className="space-y-2">
                {deploymentModes.map(mode => (
                  <label key={mode.id} className="flex items-start gap-3 p-4 border-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                    <input
                      type="radio"
                      name="deployment"
                      checked={config.deployment === mode.id}
                      onChange={() => setConfig({...config, deployment: mode.id})}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{mode.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {formatCurrency(mode.cost)}
                        {mode.monthly > 0 && ` + ${formatCurrency(mode.monthly)}/חודש`}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Scan Frequency & Count */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-800">תדירות וכמות סריקות</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">תדירות סריקה</label>
                  <select
                    value={config.scanFrequency}
                    onChange={(e) => setConfig({...config, scanFrequency: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    {scanFrequencies.map(freq => (
                      <option key={freq.id} value={freq.id}>{freq.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">מספר סריקות שנתי</label>
                  <input
                    type="number"
                    value={config.scanCount}
                    onChange={(e) => setConfig({...config, scanCount: parseInt(e.target.value) || 0})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    min="1"
                    max="365"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">עלות בסיס לסריקה: ₪4,500 × מקדם תדירות</p>
            </div>

            {/* AI & Strategic */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 cursor-pointer transition bg-gradient-to-r from-purple-50 to-white">
                  <input
                    type="checkbox"
                    checked={config.aiEnabled}
                    onChange={(e) => setConfig({...config, aiEnabled: e.target.checked})}
                    className="w-5 h-5 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <span className="font-bold text-gray-800">הוספת מנוע AI מתקדם (Offline)</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      ניתוח התנהגותי, זיהוי דפוסי תקיפה, Machine Learning מקומי
                    </div>
                    <div className="text-xs text-purple-600 mt-1 font-semibold">
                      ₪65,000 + ₪150 לתחנה
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 cursor-pointer transition bg-gradient-to-r from-green-50 to-white">
                  <input
                    type="checkbox"
                    checked={config.strategicClient}
                    onChange={(e) => setConfig({...config, strategicClient: e.target.checked})}
                    className="w-5 h-5 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-gray-800">לקוח אסטרטגי / CERT</span>
                    </div>
                    <div className="text-sm text-green-700 font-semibold">
                      הנחה מיוחדת 10% על כל העסקה
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-800">סיכום מחיר</h2>
              </div>

              <div className="space-y-3 mb-6 max-h-[500px] overflow-y-auto">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-sm text-gray-600">רישיון תחנות ({config.endpoints})</span>
                  <span className="font-medium">{formatCurrency(pricing.endpointCost)}</span>
                </div>

                {pricing.additionalModulesCost > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">מודולים מתקדמים ({config.additionalModules.length})</span>
                    <span className="font-medium">{formatCurrency(pricing.additionalModulesCost)}</span>
                  </div>
                )}

                {pricing.executionSetupCost > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">הקמת מערך ביצוע</span>
                    <span className="font-medium">{formatCurrency(pricing.executionSetupCost)}</span>
                  </div>
                )}

                {pricing.executionPerScanCost > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">עלות סריקות שנתית</span>
                    <span className="font-medium">{formatCurrency(pricing.executionPerScanCost)}</span>
                  </div>
                )}

                {pricing.deploymentSetupCost > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">פריסת שרת</span>
                    <span className="font-medium">{formatCurrency(pricing.deploymentSetupCost)}</span>
                  </div>
                )}

                {pricing.deploymentMonthlyCost > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">תחזוקה שנתית</span>
                    <span className="font-medium">{formatCurrency(pricing.deploymentMonthlyCost)}</span>
                  </div>
                )}

                {pricing.scanCost > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">עלות סריקות ({config.scanCount})</span>
                    <span className="font-medium">{formatCurrency(pricing.scanCost)}</span>
                  </div>
                )}

                {pricing.aiCost > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b bg-purple-50">
                    <span className="text-sm text-purple-700 flex items-center gap-1 font-medium">
                      <Sparkles className="w-4 h-4" />
                      AI Engine Offline
                    </span>
                    <span className="font-semibold text-purple-700">{formatCurrency(pricing.aiCost)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">סה"כ ביניים</span>
                  <span className="font-semibold text-lg">{formatCurrency(pricing.subtotal)}</span>
                </div>

                {pricing.discount > 0 && (
                  <div className="flex justify-between items-center text-green-600 bg-green-50 p-2 rounded">
                    <span className="flex items-center gap-1 font-semibold">
                      <TrendingDown className="w-4 h-4" />
                      הנחה אסטרטגית (10%)
                    </span>
                    <span className="font-bold">-{formatCurrency(pricing.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t-2 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                  <span className="text-xl font-bold text-gray-800">סה"כ לתשלום</span>
                  <span className="text-2xl font-bold text-blue-600">{formatCurrency(pricing.total)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 text-center font-medium">
                    💼 מחיר עבור שנה אחת
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-700 text-center font-medium">
                    ✓ כולל תמיכה טכנית מלאה
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-purple-700 text-center font-medium">
                    🔒 Offline / Air-Gapped
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-900 to-cyan-900 rounded-xl shadow-lg">
          <div className="text-center text-blue-100">
            <p className="font-bold text-lg">AMIR DAVIDI TECHNOLOGIES</p>
            <p className="text-sm mt-1">NAVI Forensic Suite V12 Enterprise</p>
            <p className="text-xs mt-2 text-blue-300">
              Offline Cyber Forensics & Security Posture Platform | Military-Grade Security Standard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NAVIPricingCalculator;
