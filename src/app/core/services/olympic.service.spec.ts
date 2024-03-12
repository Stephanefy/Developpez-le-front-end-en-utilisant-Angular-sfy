import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OlympicService } from './olympic.service';
import { IOlympic } from '../models/Olympic';

describe('OlympicService', () => {
  let service: OlympicService;
  let httpTestingController: HttpTestingController;
  const mockOlympics: IOlympic[] = [
    { id: 1, country: 'Italy', participations: [      {
      "id": 1,
      "year": 2012,
      "city": "Londres",
      "medalsCount": 20,
      "athleteCount": 315
    },
    {
      "id": 2,
      "year": 2016,
      "city": "Rio de Janeiro",
      "medalsCount": 17,
      "athleteCount": 312
    },
    {
      "id": 3,
      "year": 2020,
      "city": "Tokyo",
      "medalsCount": 17,
      "athleteCount": 321
    }] },
    { id: 2, country: 'Mexico', participations: [      {
      "id": 1,
      "year": 2012,
      "city": "Londres",
      "medalsCount": 44,
      "athleteCount": 425
    },
    {
      "id": 2,
      "year": 2016,
      "city": "Rio de Janeiro",
      "medalsCount": 44,
      "athleteCount": 422
    },
    {
      "id": 3,
      "year": 2020,
      "city": "Tokyo",
      "medalsCount": 37,
      "athleteCount": 425
    }] }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OlympicService]
    });
    service = TestBed.inject(OlympicService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadInitialData should fetch olympics', () => {
    service.loadInitialData().subscribe((olympics) => {
      expect(olympics.length).toBe(2);
      expect(olympics).toEqual(mockOlympics);
    });

    const req = httpTestingController.expectOne(service['olympicUrl']);
    expect(req.request.method).toEqual('GET');
    req.flush(mockOlympics);
  });

  it('loadInitialData should handle error with a specific error message', () => {
    service.loadInitialData().subscribe({
      next: () => {},
      error: (error) => {
        expect(error.message).toContain('Something bad happened; please try again later.');
      }
    });

    const req = httpTestingController.expectOne(service['olympicUrl']);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should return the correct country name', () => {
    service.getOlympicById(1).subscribe((olympic) => {
      expect(olympic.country).toEqual('Italy');
    });

    const req = httpTestingController.expectOne(service['olympicUrl']);
    expect(req.request.method).toEqual('GET');
    req.flush(mockOlympics);
  });
});
