import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphGamesComponent } from './graph-games.component';

describe('GraphGamesComponent', () => {
  let component: GraphGamesComponent;
  let fixture: ComponentFixture<GraphGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphGamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
