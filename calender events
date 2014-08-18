;(function( $, window, document, undefined ) {
 	"use strict";
	
	var Calendar = function() {

		this.init();
		return this;

	}

	Calendar.prototype = {

		init: function() {
			this.firstTime = true;
			this.fromFilters = false;
			this.calSource = locations.baseUrl + 'ajax/calendarEvents';
			this.calendarId = '#calendar';
			this.loadCalendar();
		},

		loadCalendar: function() {
			var that = this;
			//Calendar Set-Up
			var i,
				firstTime = true,
				calSource = this.calSource;

			(function setupCalendar() {

				if ( $.fn.fullCalendar ) {
					$( that.calendarId ).fullCalendar({
						header: {
							left: 'title',
							right: 'today prev,next month,agendaWeek,agendaDay'
						},
					    events: function( start, end, callback ) {
					        that.loadEvents( start, end, callback, calSource, firstTime );
						},
						//calSource,
					    loading: function( bool ) {
					        if ( bool ) {
					            $( '#loading' ).show();
					        } else {
					            $( '#loading' ).hide();
					        }
					    }
					}).limitEvents(3);
				} else {
					if ( i <= 20 ) {
						//console.log('loading calendar...');
						i += 1;
						setTimeout(function() {
							setupCalendar();
						}, 200);
					}
				}

			})( i=0 )

		},
		
		reloadCal: function () {
			var that = this,
				checkFilters = this.FiltersCal.filterArr.join(), 
				calSource,
				newSource = function( start, end, callback ) {
			        that.loadEvents( start, end, callback, calSource );
				};
			if ( checkFilters ) {				
				calSource = this.calSource+'?filters='+checkFilters;
			} else {
				calSource = this.calSource;
			}
				calSource = this.calSource,
				newSource = function( start, end, callback ) {
			        that.loadEvents( start, end, callback, calSource );
				};
			Reset_Events();
			$( this.calendarId )
				.fullCalendar('removeEvents') //Hide all events
				.fullCalendar('removeEventSources') //remove eventSource from stored hidden input
				.fullCalendar('addEventSource', newSource); //Add a new source
		},

		loadEvents: function ( start, end, callback, calSource ) {
			var that = this;
			$.ajax({
	            url: calSource,
	            dataType: 'json',
	            type: 'GET',
	            data: {
	                start: Math.round(start.getTime() / 1000),
	                end: Math.round(end.getTime() / 1000)
	            },
	            error: function(err){
	            	console.log('An error has occured. The following is the error '+err);
	            },
	            success: function(doc) {
	            	if ( that.firstTime ) {
	                	that.StreamCal.init(doc);
                		that.FiltersCal.init(that, doc);//.call(that, doc);
                		that.firstTime = false;
	                } else {
	                	if ( !that.fromFilters ) {
	                		that.StreamCal.updateEvents( doc );
	                		that.FiltersCal.updateVisibleFilters( doc );
	                	} else {
	                		that.StreamCal.updateEvents( doc );
	                		that.fromFilters = false;
	                	}
	                }
	                callback(doc);
				}
	        });

		},

		StreamCal: {

			init: function( data ) {
				this.updateEvents( data );
				return this;
			},

			updateEvents: function ( data ) {

				this.addEvents = document.getElementById('eventsContent');
				this.addEvents.innerHTML = '';
				for ( var key in data ) {
					if ( data.hasOwnProperty(key) ) {
						if( data[key]['description'] ) {
							this.dataText = data[key]['description'];
						} else {
							this.dataText = '';
						}
						this.subType	= data[key]['subtype'];
						this.itemId 	= data[key]['id'];
						this.lngTtle	= data[key]['longTitle'];
						this.colrCls 	= data[key]['colorClass'];
						this.time 		= data[key]['time'];
						this.day		= data[key]['day'];
						this.month 		= data[key]['month'];

						this.addEvents.appendChild(this.buildTemplate());
					}
				}

			},

			buildTemplate: function() {

				var docFrag   = document.createDocumentFragment(),
					wrapper   = document.createElement('div'),
					dateBox   = document.createElement('div'),
					leftSide  = document.createElement('div'),
					rightSide = document.createElement('div'),
					title 	  = document.createElement('h4'),
					text	  = document.createElement('p'),
					editWrp	  = document.createElement('div'),
					lrgeDte   = document.createElement('h2'),
					smllDte   = document.createElement('h4'),
                    smllTme   = document.createElement('h5'),
					edtBttn   = document.createElement('a'),
					dltBttn	  = document.createElement('a');

				wrapper.className = "event item-"+this.subType+" item-"+this.subType+'-'+this.itemId;
				wrapper.setAttribute('id', 'cal-num-'+this.itemId);
				title.innerHTML = this.lngTtle;
				text.innerHTML = this.dataText;
				dateBox.className = "date "+this.colrCls;
				lrgeDte.innerHTML = this.day;
				smllDte.innerHTML = this.month;
                smllTme.innerHTML = this.time;
                leftSide.className = "left";
                rightSide.className = "right";
				editWrp.className = "item-actions pull-right hide";
				edtBttn.className = "use-tooltip";
				edtBttn.setAttributes({'href': locations.baseUrl+'events/event/'+this.subType+'/'+this.itemId+'?next=calendar', "data-original-title": "Edit"});
				edtBttn.innerHTML = "<i class='icon-as-link icon-edit icon-large'></i>";
				dltBttn.className = "use-tooltip delete-record-modal-opener";
				dltBttn.setAttributes({'href': "#deleteRecordModal", "data-toggle": "modal", "data-original-title": "Delete", "data-id": this.itemId, "data-recordtype": this.subType});
				dltBttn.innerHTML = "<i class='icon-as-link icon-trash icon-large'></i>";

				dateBox.appendChildren([ smllDte, lrgeDte, smllTme ]);
				editWrp.appendChildren([ edtBttn, dltBttn ]);
				leftSide.appendChildren([ dateBox ]);
				rightSide.appendChildren([ title, text ]);
				wrapper.appendChildren([ leftSide, rightSide, editWrp ]);
				docFrag.appendChild(wrapper);
				return docFrag;

			}

		},

		FiltersCal: {

			// on page load run init, will happen when you do var filters = new Filters( filters )
			// on page load set the filters that need to be shown by calling showFilters
			// on page load check those filters

			//on ajax call updateVisibleFilters( filters )
			init: function( that, data ) {
				this.parentThat = that;
				this.calLoadCheck = false;
				this.filterChanged = false;
				this.filterArr = [];
				this.allFilters = [ 'exercise', 'glucose', 'medication', 'meal', 'weight', 'notification', 'sms', 'email' ]; //set on page load , equals your array of all filters
				this.visibleFilters = this.parseData(data); // the filters that need to be shown
				this.showFilters();
			},

			updateVisibleFilters: function ( data ) {
				//console.log('update visible filters');
				this.visibleFilters = this.parseData(data); // the filters that need to be shown
				console.log(this.visibleFilters);
				//loop though visible filters, if filter is in it, ditch it, otherwise add it
				this.showFilters();
			},

			parseData: function ( data ) {
				//console.log('parse data');
				var newData = [];
				for ( var key in data ) {
					if ( data.hasOwnProperty(key) ) {
						if ( newData.indexOf(data[key]['subtype']) < 0 ) {
							newData.push(data[key]['subtype']);
						}
					}
				}
				return newData;
			},

			filterChecked: function( str ) {
				if ( this.filterArr.indexOf(str) < 0 ) {
					this.filterArr.push(str);
				} else {
					this.filterArr.remove(str);
				}
				this.filterChanged = true;
				this.showFilters();
			},

			showFilters: function() {
				var that = this;
				if ( !this.filterChanged ) {
					//loop through filter elements compare to all filters against visible filters, example:

					var isVisibleFilter = false;
					for ( var i = 0, f = this.allFilters.length; i < f; ++i ) {
						var filter = this.allFilters[ i ],
							filterNode = document.getElementById('calendar-filter-'+filter);
						for ( var z = 0, x = this.visibleFilters.length; z < x; ++z ) {
							if ( filter === this.visibleFilters[ z ] ) {
								isVisibleFilter = true;
							}
						}
						if( isVisibleFilter ) {
							filterNode.style.display = "inline";
							isVisibleFilter = false;
						} else {
							if ( filterNode.childNodes[1].hasClass('label-success') ) {
								filterNode.style.display = "none";
							}
						}
					}
				} else {
					var filters = this.filterArr.join(),
						calSource = that.parentThat.calSource+'?filters='+filters,
						newSource = function( start, end, callback ) {
					        that.parentThat.loadEvents( start, end, callback, calSource );
						};
						that.parentThat.fromFilters = true;
						this.filterChanged = false;
					Reset_Events();
					$( that.parentThat.calendarId )
						.fullCalendar('removeEvents') //Hide all events
						.fullCalendar('removeEventSources') //remove eventSource from stored hidden input
						.fullCalendar('addEventSource', newSource); //Add a new source
				}
			}

		}

	}

})( jQuery, window, document );
