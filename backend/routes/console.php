<?php
use Illuminate\Support\Facades\Schedule;
Schedule::command('scrape:all-articles')->hourly();

