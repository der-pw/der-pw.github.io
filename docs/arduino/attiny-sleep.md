---
title: Docs with VitePress
editLink: true
sidebarDepth: 2
---

# ATtiny
Kleine Projekte realisiere ich gern mit dem ATtiny85.  
Gerade für batteriebetriebene Anwendungungen ist er auf Grund seiner Stromspareigenschaften interessant.

## Stromsparen mit dem ATtiny
Hier am Beispiel eines ATTiny85

### Aufwecken durch Pin Change Interrupt (PCI)
```c++
#include <avr/sleep.h>
#include <avr/power.h>

#define LED    PCINT0
#define BUTTON PCINT2

ISR (PCINT0_vect) {}

void setup()
{
    pinMode(LED, OUTPUT);
    pinMode(BUTTON, INPUT_PULLUP);

    // pin change interrupt
    PCMSK |= bit (BUTTON);
    GIFR  |= bit (PCIF); // clear any outstanding interrupts
    GIMSK |= bit (PCIE); // enable pin change interrupts
}

void loop()
{
    digitalWrite (LED, HIGH);
    delay (5000);
    digitalWrite (LED, LOW);
    goToSleep();
}

void goToSleep()
{
    set_sleep_mode(SLEEP_MODE_PWR_DOWN);
    ADCSRA = 0;            // turn off ADC
    power_all_disable();  // power off ADC, Timer 0 and 1, serial interface
    sleep_enable();
    sleep_cpu();
    sleep_disable();
    power_all_enable();    // power everything back on
}
```
### Aufwecken durch Watchdog Timer (WDT)

```c++
#include <avr/sleep.h>
#include <avr/wdt.h>

#define LED    PCINT0

volatile bool toggle = true;

// Watchdog imer Interrupt Service Routine
ISR(WDT_vect)
{
    toggle = true;
}

void setup()
{
    pinMode(LED, OUTPUT);

    // setup of the WDT
    cli();
    wdt_reset(); // reset watchdog timer
    MCUSR &= ~(1 << WDRF); // remove reset flag
    WDTCR = (1 << WDCE); // set WDCE, access prescaler
    WDTCR = 1 << WDP0 | 1 << WDP1 | 1 << WDP2; // set prescaler bits to to 2s
    WDTCR |= (1 << WDIE); // access WDT interrupt
    sei();
}

void loop()
{
    if (toggle) {
        toggle = false;
        digitalWrite(LED, !digitalRead(LED));
        enterSleepMode();
    }
}

void enterSleepMode()
{
    byte adcsra;

    adcsra = ADCSRA; // save ADC control and status register A
    ADCSRA &= ~(1 << ADEN); // disable ADC

    MCUCR |= (1 << SM1) & ~(1 << SM0); // Sleep-Modus = Power Down
    MCUCR |= (1 << SE); // set sleep enable
    sleep_cpu(); // sleep
    MCUCR &= ~(1 << SE); // reset sleep enable

    ADCSRA = adcsra; // restore ADC control and status register A
}
```