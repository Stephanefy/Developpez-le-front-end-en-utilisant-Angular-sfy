import { ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';


import {Location} from "@angular/common";
import { PieComponent } from './pie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from 'src/app/app-routing.module';

describe('PieComponent', () => {
  let component: PieComponent;
  let fixture: ComponentFixture<PieComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
  });

  it('navigate to country details chart takes you to /details/:id/:bgColor', fakeAsync(() => {

    const bgColor = "945f65"
    const id = "1"

    router.navigate(['details', id, bgColor]);
    tick(50);
    expect(location.path()).toBe(`/details/${id}/${bgColor}`);
  }));

});
