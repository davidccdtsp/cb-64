import { TestBed } from '@angular/core/testing';
import { Candidate } from '../../../model/candidatos-model';
import { Domain } from '../../../model/domain-model';
import { DataService } from '../../../services/data.service';
import { ScoringService } from '../../../services/scoring.service';
import { DeploymentSelect } from './deployment-select';

describe('DeploymentSelect', () => {
  const all = [
    { domain: Domain.data, deployment: ['embebido', 'saas'] },
    { domain: Domain.martech, deployment: ['docker', 'saas'] },
  ] as Candidate[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DataService, useValue: { candidates: (f: { domain?: Domain } = {}) => all.filter((c) => f.domain === undefined || c.domain === f.domain) } },
        { provide: ScoringService, useValue: { requiredDeployments: () => [], setRequiredDeployments: () => undefined } },
      ],
    });
  });

  const options = (area?: 'datos' | 'martech') => {
    const fixture = TestBed.createComponent(DeploymentSelect);
    if (area) fixture.componentRef.setInput('area', area);
    return (fixture.componentInstance as unknown as { deployments: () => string[] }).deployments();
  };

  it('ofrece los despliegues del área indicada y, sin área, los de todas', () => {
    expect(options('datos')).toEqual(['embebido', 'saas']);
    expect(options('martech')).toEqual(['docker', 'saas']);
    expect(options()).toEqual(['docker', 'embebido', 'saas']);
  });
});
